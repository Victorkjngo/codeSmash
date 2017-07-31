import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from './Main.jsx';
import AttentionGrabber from './AttentionGrabber.jsx';
import Footer from './Footer.jsx';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <Main />
        <AttentionGrabber />
        <Footer />
        
      </div>
    );
  }
}

export default Home;