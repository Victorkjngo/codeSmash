import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';

class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <h1>
          Pricing!
        </h1>
      </div>
    );
  }
}

export default Pricing;