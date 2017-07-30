import React, { Component } from 'react';
import NavBar from '../Routes/NavBar.jsx';

class Main extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="main-page">
        <NavBar hideCodeNow="true" />
        <div className="container-fluid">
          <div className="row center-piece text-center">
            <h1 className="title">CodeSmash</h1> 
            <p className="slogan">Coding interviews made simple</p>
            <button className="btn btn-danger">Start</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;