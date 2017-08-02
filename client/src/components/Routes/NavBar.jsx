import { Link } from 'react-router-dom';
import React from 'react';

module.exports = ({hideCodeNow}) => (
  <nav className='navbar navbar-inverse' role='navigation'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
        <Link to='/'><a className='navbar-brand'>CodeSmash</a></Link>
      </div>
      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>

        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/pricing'>Pricing</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);
