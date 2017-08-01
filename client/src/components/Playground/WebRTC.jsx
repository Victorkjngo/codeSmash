import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';


class WebRTC extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    /** CONFIG **/
    // var SIGNALING_SERVER = 'http://localhost';
    var USE_AUDIO = true;
    var USE_VIDEO = true;
    var DEFAULT_CHANNEL = 'some-global-channel-name';
    var MUTE_AUDIO_BY_DEFAULT = false;

    /** You should probably use a different stun server doing commercial stuff **/
    /** Also see: https://gist.github.com/zziuni/3741933 **/
    var ICE_SERVERS = [
      { url: 'stun:global.stun.twilio.com:3478?transport=udp' }
    ];

    var signaling_socket = null; /* our socket.io connection to our webserver */
    var local_media_stream = null; /* our own microphone / webcam */
    var peers = {}; /* keep track of our peer connections, indexed by peer_id (aka socket.io id) */
    var peer_media_elements = {}; /* keep track of our <video>/<audio> tags, indexed by peer_id */

    // signaling_socket = io(SIGNALING_SERVER);
    signaling_socket = io();

    signaling_socket.on('connect', function() {
      setup_local_media(function() {
        /* once the user has given us access to their
         * microphone/camcorder, join the channel and start peering up */
        join_chat_channel(DEFAULT_CHANNEL, {
          'whatever-you-want-here': 'stuff'
        });
      });
    });
    signaling_socket.on('disconnect', function() {
      console.log('Disconnected from signaling server');
      /* Tear down all of our peer connections and remove all the
       * media divs when we disconnect */
      for (peer_id in peer_media_elements) {
        peer_media_elements[peer_id].remove();
      }
      for (peer_id in peers) {
        peers[peer_id].close();
      }

      peers = {};
      peer_media_elements = {};
    });

    const join_chat_channel = function(channel, userdata) {
      signaling_socket.emit('join', {
        'channel': channel,
        'userdata': userdata
      });
    };

    const part_chat_channel = function(channel) {
      signaling_socket.emit('part', channel);
    };


    /**
     * When we join a group, our signaling server will send out 'addPeer' events to each pair
     * of users in the group (creating a fully-connected graph of users, ie if there are 6 people
     * in the channel you will connect directly to the other 5, so there will be a total of 15
     * connections in the network).
     */
    signaling_socket.on('addPeer', function(config) {
      console.log('addPeer 1: Signaling server said to add peer:', config);
      var peer_id = config.peer_id;
      if (peer_id in peers) {
        /* This could happen if the user joins multiple channels where the other peer is also in. */
        console.log('addPeer 1: Already connected to peer ', peer_id);
        return;
      }


      var peer_connection = new RTCPeerConnection({
        'iceServers': ICE_SERVERS
      }, {
        'optional': [{
          'DtlsSrtpKeyAgreement': true
        }]
      }
        /* this will no longer be needed by chrome
         * eventually (supposedly), but is necessary
         * for now to get firefox to talk to chrome */
      );


      peers[peer_id] = peer_connection;

      peer_connection.onicecandidate = function(event) {
        if (event.candidate) {
          signaling_socket.emit('relayICECandidate', {
            'peer_id': peer_id,
            'ice_candidate': {
              'sdpMLineIndex': event.candidate.sdpMLineIndex,
              'candidate': event.candidate.candidate
            }
          });
        }
      };

      // ON ADD STREAM NOT WORKING
      peer_connection.onaddstream = function(event) {
        console.log('addPeer: onaddstream WORKING!');
        var remote_media = USE_VIDEO ? document.createElement('video') : document.createElement('audio');
        remote_media.setAttribute('autoplay', 'autoplay');
        if (MUTE_AUDIO_BY_DEFAULT) {
          remote_media.setAttribute('muted', 'true');
        }
        remote_media.setAttribute('height', '199px');
        peer_media_elements[peer_id] = remote_media;

        var video = document.getElementsByClassName('videos');
        video[0].appendChild(remote_media);
        // console.log(remote_media)
        attachMediaStream(remote_media, event.stream);
      };

      /* Add our local stream */
      // setup_local_media(() => signaling_socket.emit('join', {channel: DEFAULT_CHANNEL, userdata:'something'}), function () { // SOURCE OF ERROR?
      //   console.log('addPeer: Error adding stream!');
      // });


      peer_connection.addStream(local_media_stream);

      /* Only one side of the peer connection should create the
       * offer, the signaling server picks one to be the offerer.
       * The other user will get a 'sessionDescription' event and will
       * create an offer, then send back an answer 'sessionDescription' to us
       */
      if (config.should_create_offer) {
        console.log('Creating RTC offer to ', peer_id);
        peer_connection.createOffer(
          function(local_description) {
            console.log('Local offer description is: ', local_description);
            peer_connection.setLocalDescription(local_description,
              function() {
                signaling_socket.emit('relaySessionDescription', {
                  'peer_id': peer_id,
                  'session_description': local_description
                });
                console.log('Offer setLocalDescription succeeded');
              },
              function() {
                Alert('Offer setLocalDescription failed!');
              }
            );
          },
          function(error) {
            console.log('Error sending offer: ', error);
          });
      }
    });


    /**
     * Peers exchange session descriptions which contains information
     * about their audio / video settings and that sort of stuff. First
     * the 'offerer' sends a description to the 'answerer' (with type
     * 'offer'), then the answerer sends one back (with type 'answer').
     */
    signaling_socket.on('sessionDescription', function(config) {
      console.log('Remote description received: ', config);
      var peer_id = config.peer_id;
      var peer = peers[peer_id];
      var remote_description = config.session_description;
      console.log(config.session_description);

      var desc = new RTCSessionDescription(remote_description);
      peer.setRemoteDescription(desc,
        function() {
          console.log('sessionDescription 1: setRemoteDescription succeeded');
          if (remote_description.type === 'offer') {
            console.log('Creating answer');
            peer.createAnswer(
              function(local_description) {
                console.log('sessionDescription2: Answer description is: ', local_description);
                peer.setLocalDescription(local_description,
                  function() {
                    signaling_socket.emit('relaySessionDescription', {
                      'peer_id': peer_id,
                      'session_description': local_description
                    });
                    console.log('Answer setLocalDescription succeeded');
                  },
                  function() {
                    Alert('Answer setLocalDescription failed!');
                  }
                );
              },
              function(error) {
                console.log('Error creating answer: ', error);
                console.log(peer);
              });
          }
        },
        function(error) {
          console.log('setRemoteDescription error: ', error);
        }
      );

    });

    /**
     * The offerer will send a number of ICE Candidate blobs to the answerer so they
     * can begin trying to find the best path to one another on the net.
     */
    signaling_socket.on('iceCandidate', function(config) {
      var peer = peers[config.peer_id];
      var ice_candidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });


    /**
     * When a user leaves a channel (or is disconnected from the
     * signaling server) everyone will recieve a 'removePeer' message
     * telling them to trash the media channels they have open for those
     * that peer. If it was this client that left a channel, they'll also
     * receive the removePeers. If this client was disconnected, they
     * wont receive removePeers, but rather the
     * signaling_socket.on('disconnect') code will kick in and tear down
     * all the peer sessions.
     */
    signaling_socket.on('removePeer', function(config) {
      var peer_id = config.peer_id;
      if (peer_id in peer_media_elements) {
        peer_media_elements[peer_id].remove();
      }
      if (peer_id in peers) {
        peers[peer_id].close();
      }

      delete peers[peer_id];
      delete peer_media_elements[config.peer_id];
    });




    /***********************/
    /** Local media stuff **/
    /***********************/
    function attachMediaStream (element, stream) {
      if (element === undefined) {
        debugger;
      }
      if (element !== undefined) {
        element.srcObject = stream;
      } else {
        console.error('Element undefined!');
        return;
      }
    };

    const setup_local_media = (callback, errorback) => {
      if (local_media_stream != null) { /* ie, if we've already been initialized */
        if (callback) {
          callback();
        }
        return;
      }
      /* Ask user for permission to use the computers microphone and/or camera,
      * attach it to an <audio> or <video> tag if they give us access. */


      navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      );


      navigator.getUserMedia({
        'audio': USE_AUDIO,
        'video': USE_VIDEO
      },
      (stream) => { /* user accepted access to a/v */

        local_media_stream = stream;
        var local_media = USE_VIDEO ? document.createElement('video') : document.createElement('audio');

        local_media.setAttribute('autoplay', 'autoplay');
        local_media.setAttribute('muted', 'true'); /* always mute ourselves by default */
        local_media.setAttribute('height', '199px');

        var video = document.getElementsByClassName('videos');
        video[0].appendChild(local_media);
        attachMediaStream(local_media, stream);

        if (callback) {
          callback(local_media_stream);
        }
      },
      () => { /* user denied access to a/v */
        console.log('Access denied for audio/video');
        alert('You chose not to provide access to the camera/microphone, demo will not work.');
        if (errorback) {
          errorback();
        }
      });

    };

  }
    handleVideoToggle() {      
      $('#video-toggle').on('click', $('#video-bar').slideToggle());

    }

    handleAudioToggle() {
      var videos = document.getElementsByTagName('video')
      // var videos is an HTML collection, must use For loop to iterate
      for (let i = 0; i < videos.length; i++) {
        videos[i].muted === 'true' ? videos[i].setAttribute('muted', 'false') : videos[i].setAttribute('muted', 'true')
      }       
    }

  render () {
    return (
      <div className="center row" id="web-rtc-video">
        <div className="col-sm-1 video-buttons">
          <div className="btn-group-vertical" role="group">
            <button type="button" id="video-toggle" onClick={this.handleVideoToggle} className="btn btn-default glyphicon glyphicon-facetime-video" aria-label="Left Align" aria-hidden="true">
            </button>
            <button type="button" onClick={this.handleAudioToggle} className="btn btn-default glyphicon glyphicon-headphones" aria-label="Left Align" aria-hidden="true">
            </button>
          </div>
        </div>
        <div id='video-bar'>
          <div className='col-sm-10 videos'></div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  }
}


export default WebRTC;