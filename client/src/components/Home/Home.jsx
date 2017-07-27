import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar/>
        <h1>CodeSmash helps you interview your candidates in an <br/>intuitive live programming environment</h1>
        <div className='container'>
          <img src='https://d146h09pbg0b1a.cloudfront.net/assets/homepage/whiteboard_frame-c8b0b250bc7b675e38a001dba2425212823a2fd7f14aa1b64044d5112ce0ca4b.png'/>
        </div>
      </div>
    );
  }
}

export default Home;