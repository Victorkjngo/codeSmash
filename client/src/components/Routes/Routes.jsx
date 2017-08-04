import React from 'react';
import { Router, Route, browserHistory, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import View from '../View.jsx';
import Home from '../Home/Home.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import Pricing from '../Pricing/Pricing.jsx';
import Login from '../Authentication/Login.jsx';
import Questions from '../Dashboard/Questions.jsx';
import ScheduleInterview from '../Dashboard/ScheduleInterview.jsx';

const routes = [
  { path: '/',
    component: Home,
    exact: true
  },
  { path: '/view',
    component: View,
  },
  { path: '/dashboard',
    component: Dashboard,
  },
  { path: '/pricing',
    component: Pricing,
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/questions',
    component: Questions
  },
  {
    path: '/schedule',
    component: ScheduleInterview
  }
];

module.exports = (
  <BrowserRouter history={ browserHistory }>
    <Switch>
      <Route exact path={'/'} component={Home}></Route>
      <Route path={'/view/:id'} component={View}></Route>
      <Route path={'/dashboard'} component={Dashboard}></Route>
      <Route path={'/login'} component={Login}></Route>
      <Route path={'/pricing'} component={Pricing}></Route>
      <Route path={'/questions'} component={Questions}></Route>
      <Route path={'/schedule'} component={ScheduleInterview}></Route>

    </Switch>
  </BrowserRouter>
);