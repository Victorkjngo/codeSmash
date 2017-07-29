import React, { Component } from 'react';

class OptionsAndInfo extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='options-and-info container-fluid'>
        <div className="text-center row-centered center row white-text grid-center options-display">
          <div className="col-md-4 option">
            One
          </div>
          <div className="col-md-4 option">
            Two
          </div>
          <div className="col-md-4 option">
            Three
          </div>
        </div>
      </div>
    );
  }
}

export default OptionsAndInfo;