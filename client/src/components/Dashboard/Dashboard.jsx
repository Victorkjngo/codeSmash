import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log('Navbar:', Navbar);
    return (
      <div>
        <Navbar/>
        <h1>
          Dashboard!
        </h1>
      </div>
    );
  }
}

export default Dashboard;