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
        <NavBar/>
        <div className="center container-fluid">
          <div className="row-fluid">
            <h1>CodeSmash helps you interview your candidates in an <br/>intuitive live programming environment</h1> 
            <p>Smash smash smashSmash smash smashSmash smash smashSmash smash smashSmash smash smashSmash smash smashSmash smash smashSmash smash smash</p>
            <button className="btn btn-danger">SMASH IT!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;