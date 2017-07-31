import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <footer >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-6 .col-sm-6 center">
              <h2>Contact</h2>
              <br/>
              <ul className="contact-list">
                <li>
                  <a href="#">Matt Reyes</a>
                </li>
                <li>
                  <a href="#">Jun Park</a>
                </li>
                <li>
                  <a href="#">Victor Ngo</a>
                </li>
              </ul>
              
              
              
            </div>
            <div className="col-md-6 col-xs-6 .col-sm-6 center">
              <a href="#">About</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;