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
        <Link to='/home'><a className='navbar-brand'>CodeSmash</a></Link>
      </div>
      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        {Boolean(!hideCodeNow) ? <Link to='/view'><button className='btn btn-danger navbar-btn'>Code Now</button></Link> : '' }
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/pricing'>Pricing</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

{
// DROP DOWN MENU
// <li className='dropdown'>
//   <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Dropdown <b className='caret'></b></a>
// <ul className='dropdown-menu'>
//   <li><a href='#'>Action</a></li>
//   <li><a href='#'>Another action</a></li>
//   <li><a href='#'>Something else here</a></li>
//   <li className='divider'></li>
//   <li><a href='#'>Separated link</a></li>
//   <li className='divider'></li>
//   <li><a href='#'>One more separated link</a></li>
// </ul>
}

{/* <nav className='navbar navbar-inverse'>
  <div className='container-fluid'>
    <div className='navbar-header'>
      <Link to='/home'><a className='navbar-brand'>CodeSmash</a></Link>
    </div>
    <Link to='/'><button className='btn btn-danger navbar-btn'>Code Now</button></Link>
    <ul className='nav navbar-nav navbar-right'>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='/pricing'>Pricing</Link></li>
    </ul>
  </div>
</nav> */}

