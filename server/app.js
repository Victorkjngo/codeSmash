  'use strict';
  const express = require('express');
  const path = require('path');
  const middleware = require('./middleware');
  const routes = require('./routes');

  const app = express();

  // SOCKET IO TENTATIVE CODE
  const server = require('http').createServer(app);
  const io = require('socket.io')();


  io.attach(server);
  io.set('transports', ['websocket']);

  app.use(middleware.morgan('dev'));
  app.use(middleware.cookieParser());

  app.use(middleware.bodyParser.urlencoded({ extended: false }));
  app.use(middleware.bodyParser.json());

  app.set('views', path.join(__dirname, 'views'));
  // console.log('Loading view engine...');
  app.set('view engine', 'ejs');

  app.use(middleware.auth.session);
  app.use(middleware.passport.initialize());
  app.use(middleware.passport.session());
  app.use(middleware.flash());

  app.use(express.static(path.join(__dirname, '../public')));

  app.use('/', routes.auth);
  app.use('/api', routes.api);
  app.use('/api/profiles', routes.profiles);



  var channels = {};
  var sockets = {};


  io.on('connection', function(socket) {
    // console.log('a user connected. Client id:', socket.id);
    // console.log('Connecto to room numba', socket.rooms);
    // console.log('Handshake details', JSON.stringify(socket.handshake));

    socket.channels = {};
    sockets[socket.id] = socket;

    console.log('[' + socket.id + '] connection accepted');
    socket.on('disconnect', function() {
      for (var channel in socket.channels) {
        part(channel);
      }
      console.log('[' + socket.id + '] disconnected');
      delete sockets[socket.id];
    });


    socket.on('join', function(config) {
      console.log('[' + socket.id + '] join ', config);
      var channel = config.channel;
      var userdata = config.userdata;

      if (channel in socket.channels) {
        console.log('[' + socket.id + '] ERROR: already joined ', channel);
        return;
      }

      if (!(channel in channels)) {
        channels[channel] = {};
      }

      for (var id in channels[channel]) {
        channels[channel][id].emit('addPeer', { 'peer_id': socket.id, 'should_create_offer': false });
        socket.emit('addPeer', { 'peer_id': id, 'should_create_offer': true });
      }

      channels[channel][socket.id] = socket;
      socket.channels[channel] = channel;
    });

    const part = function(channel) {
      console.log('[' + socket.id + '] part ');

      if (!(channel in socket.channels)) {
        console.log('[' + socket.id + '] ERROR: not in ', channel);
        return;
      }

      delete socket.channels[channel];
      delete channels[channel][socket.id];

      for (var id in channels[channel]) {
        channels[channel][id].emit('removePeer', { 'peer_id': socket.id });
        socket.emit('removePeer', { 'peer_id': id });
      }
    };

    socket.on('part', part);

    socket.on('relayICECandidate', function(config) {
      var peer_id = config.peer_id;
      var ice_candidate = config.ice_candidate;
      console.log('[' + socket.id + '] relaying ICE candidate to [' + peer_id + '] ', ice_candidate);

      if (peer_id in sockets) {
        sockets[peer_id].emit('iceCandidate', { 'peer_id': socket.id, 'ice_candidate': ice_candidate });
      }
    });

    socket.on('relaySessionDescription', function(config) {
      var peer_id = config.peer_id;
      var session_description = config.session_description;
      console.log('[' + socket.id + '] relaying session description to [' + peer_id + ']', session_description);

      if (peer_id in sockets) {
        sockets[peer_id].emit('sessionDescription', { 'peer_id': socket.id, 'session_description': session_description });
      }
    });


    //playground
    socket.on('changed_code', function(code) {
      // console.log('user changed code:', code);
      socket.broadcast.emit('changed_code', code);
    });

    socket.on('executed_code', function(code) {
      // console.log('Executed code:', code);
      socket.broadcast.emit('executed_code', code);
    });

    socket.on('cleared_terminal', function(code) {
      // console.log('Broadcasting cleared code event!', code);
      socket.broadcast.emit('cleared_terminal');
    });

    socket.on('disconnect', function(code, stdio) {
      // console.log('user disconnected...');
    });

    socket.on('error', function(error) {
      // console.error('Error: ', error);
    });




  });
  module.exports = server;
