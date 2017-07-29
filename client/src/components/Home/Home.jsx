import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from './Main.jsx';
import OptionsAndInfo from './OptionsAndInfo.jsx';
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
        <OptionsAndInfo />
        <Footer />
      </div>
    );
  }
}

export default Home;