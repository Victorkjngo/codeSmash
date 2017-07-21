import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Playground } from './Playground/index.jsx';
import { Terminal } from './Playground/index.jsx';
import { Twilio } from './Playground/index.jsx';
import xTerm from 'xterm';
import io from 'socket.io-client';
import PeerConnection from 'rtcpeerconnection';

class View extends Component {

  constructor(props) {
    super(props);
    var socket = io();

    this.state = {
      terminal: undefined,
      socket: socket,
      editorCode: 'function myScript() {\n\treturn 100;\n}\nconsole.log(myScript());'
    };
    
    xTerm.loadAddon('fit');
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  componentDidMount () {
    var audio = document.querySelector('audio');
    var config = {};
    var constraints = {};

    var mediaStreamConstraints = {
      audio: true,
    };
    // instnatiate RTCConnect object
    var pc = new PeerConnection(config, constraints);

    var gotStream = (stream) => {
      var streamUrl = window.URL.createObjectURL(stream);
      console.log('Heres the streamURL:', streamUrl, '\nHeres the stream', stream);
      window.stream = stream;
      audio.src = streamUrl;

      // Add mediaStream to pc
      console.log('Adding stream to PC...');
      pc.addStream(stream);

      // Assume PC sets local description
      pc.offer({
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: false
        }
      }, 
      (err, offer) => {
        if (!err) {
          console.log('About to send offer...', offer);
          this.state.socket.emit('offer', offer);
        }
        if (err) {
          console.log('Error:', err);
        }
      });
    };

    var failedStream = (err) => {
      console.log('Stream Error:', err);
    };

    // MEDIA STREAM HERE!
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia(mediaStreamConstraints, gotStream, failedStream);
    
    

    
    // OFFERRING!
    // create an offer
    // OPTION 1
    // pc.offer(function (err, offer) {
    //     if (!err) this.state.socket.emit('offer', offer)
    // });

    // OPTION 2
    // you can also optionally pass in constraints
    // when creating an offer.

    // when you recieve an offer, you can answer
    // with various options
    this.state.socket.on('offer', function (offer) {
      // let the peerconnection handle the offer
      // by calling handleOffer
      // set remote description?
      pc.handleOffer(offer, function (err) {

        console.log('Handling offer...', offer);
        if (err) {
          // handle error
          console.error('Error on handling offer. Ill take a nap!\nError:', err);
          return;
        }

        // you can just call answer
        // pc.answer((err, answer) => {
        //   console.log('Responding with answer...', answer);
        //   if (!err) this.state.socket.emit('answer', answer);
        // });

        // Other options to respond to offer with!
        // // you can call answer with contstraints
        // pc.answer(MY_CONSTRAINTS, function (err, answer) {
        //     if (!err) this.state.socket.send('answer', answer);
        // });    

        // // or you can use one of the shortcuts answers

        // // for video only
        // pc.answerVideoOnly(function (err, answer) { 
        //   // log answer, find out what it is?
        // });

        // // and audio only
        pc.answerAudioOnly((err, answer) => {
          // log answer, find out what it is?
          if (!err) {
            this.state.socket.send('answer', answer);
          }
        });
      
        console.log('Done handling offer. End of communication.');
      }); 
    });

    // when you get an answer, you just call
    // handleAnswer
    this.state.socket.on('answer', function (answer) {
      console.log('Answer recieved. Handling answer...', answer);
      pc.handleAnswer(answer);
    });

    

    pc.on('addStream', function (event) {
      // do something with event.stream
      // probably attach it to a <video> element
      // and play it.
      console.log('Stream added!');
    });

    // remote stream removed
    pc.on('removeStream', function (event) {
      // remote stream removed
      // now you could hide/disable removed video
      console.log('Remote stream removed...');
    });

    pc.on('close', function () {
      console.log('PC connection closed!');
    });

    // the only other thing you have to do is listen, transmit, and process ice candidates
    // you have to send them when generated
    pc.on('ice', (candidate) => {
      console.log('Transmitting ice candidate information...', candidate);
      this.state.socket.emit('ice', candidate);
    });

    // process incoming ones
    this.state.socket.on('ice', function (candidate) {
      console.log('Recieved ICE candidate... Processing...', candidate);
      pc.processIce(candidate);
    });










    
    // Terminal Setup
    var options = {
      cursorBlink: true,
      tabStopWidth: 4
    };
    var term = new xTerm(options);

    this.setState({terminal: term}, _ => {
      term.open(document.getElementById('terminal'));
      term.fit();
      term.blur();

      this.state.socket.on('executed_code', (output) => {
        this.writeTerminal(output);
      });

    });
    
  }

  handleClearClick () {
    this.state.terminal.clear();
  }

    
  writeTerminal (output) {
    var {result, logs, error, longError} = output;

    if (logs.length > 1) {
      this.state.terminal.writeln(logs.join(''));
    } else {
      this.state.terminal.writeln(logs.join('\n'));
    }
    
    if (error) {
      this.state.terminal.writeln(result); // when there's an error, result will become a error message
    }

  }
  
  handleRunClick () {
    // Colorizing feature
    // let colorNode = function (node, color, cb) {
    //   node.style.color = color;
    //   if (cb) {
    //     cb();
    //   }
    // }
    
    let code = document.getElementById('code').value;
    var payload = {
      code: code
    };

    // Socket io emit
    payload = JSON.stringify(payload);

    var headers = new Headers({
      'Content-Type': 'application/json' 
    });
    
    var options = {
      method: 'POST',
      body: payload,
      headers: headers
    };
    
    fetch('run', options)
      .then((res) => {
        res.text()
        .then(output => {
          output = JSON.parse(output);
          console.log('Response from server:', output, typeof output);

          this.state.socket.emit('executed_code', output); 
          this.writeTerminal(output);
          
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render () {
    console.log('Playground:', Playground);
    return (
      <div className="view">
        <Playground handleRunClick={this.handleRunClick} handleClearClick={this.handleClearClick} editorCode={this.state.editorCode} socket={this.state.socket}/>
         <div className="Terminal" id="terminal"></div>   
         <audio controls autoPlay>Audio </audio>     
      </div>
    );
  }
}

export default View;