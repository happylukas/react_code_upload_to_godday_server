import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Login';
import Signup from './Signup';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/signup' component={Signup}></Route>
    </Switch>
  );
}

export default Main;