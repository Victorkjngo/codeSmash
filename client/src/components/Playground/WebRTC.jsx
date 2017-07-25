import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimpleWebRTC from 'simplewebrtc';

class WebRTC extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remotesVideos',
      // immediately ask for camera access
      autoRequestMedia: true,
    });

    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom('abc123');
    });
  }

  render () {
    return (
      <div className="WebRTC">
        <video id="localVideo" width="320" height="240" controls></video>
        <div id="remotesVideos"></div>   
      </div>
    );
  }
}


export default WebRTC;