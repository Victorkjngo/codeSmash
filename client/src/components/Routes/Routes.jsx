import React from 'react';
import { Router, Route, browserHistory, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import View from '../View.jsx';
import Home from '../Home/Home.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import Pricing from '../Pricing/Pricing.jsx';

const routes = [
  { path: '/',
    component: View,
    exact: true
  },
  { path: '/home',
    component: Home,
  },
  { path: '/dashboard',
    component: Dashboard,
  },
  { path: '/pricing',
    component: Pricing,
  }
];

module.exports = (
  <BrowserRouter history={ browserHistory }>
    <Switch>
      <Route exact path={'/'} component={Home}></Route>
      <Route path={'/home'} component={Home}></Route>
      <Route path={'/dashboard'} component={Dashboard}></Route>
      <Route path={'/pricing'} component={Pricing}></Route>
    </Switch>
  </BrowserRouter>
);