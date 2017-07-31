import React, { Component } from 'react';

class MastHead extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="container-fluid mast-head">
        <div className="row center-piece text-center">
          <h1 className="title">CodeSmash</h1>
          
          <p className="slogan">Coding interviews<br/>made simple</p>
        </div>
      </section>
    );
  }
}

export default MastHead;