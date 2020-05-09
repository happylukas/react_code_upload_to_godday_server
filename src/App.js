import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './login.js';
import Signup from './signup.js';
import Dashboard from './dashboard.js';
import Signupm from './signupm.js';
import Delcard from './delcard.js';
//import Chat from "./chat.js";
class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Signupm" component={Signupm} />
            <Route path="/delcard" component={Delcard} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;