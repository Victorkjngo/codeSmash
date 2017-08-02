import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Main from './Main.jsx';
import AttentionGrabber from './AttentionGrabber.jsx';
import Footer from './Footer.jsx';
import cryptoRandomString from 'crypto-random-string';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount () { 
  }

  getRandomRoomNumber () {
    return cryptoRandomString(10);
  }

  render() {
    return (
      <div className="home landing-container container center">
        <Main />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 center">
              <div className="jumbotron center" id="landing-header">
                <h1>CodeSmash</h1>
                <h2>Collaborate with and interview software engineers in a real-time coding environment with seamless video communication</h2>
              </div>
              <div className="container"> 
                <Link to={'/view/'+ this.getRandomRoomNumber()}><button className='btn btn-danger landing-btn'>Code Now</button></Link>
                <Link to='/login'><button className='btn btn-info landing-btn'>Login/Signup</button></Link>
              </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}

export default Home;