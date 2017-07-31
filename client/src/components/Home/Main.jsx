import React, { Component } from 'react';
import NavBar from '../Routes/NavBar.jsx';
import MastHead from './MastHead.jsx';

class Main extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="main-page">
        <NavBar />
        <MastHead />
        
      </section>
    );
  }
}

export default Main;