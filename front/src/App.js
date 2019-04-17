import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile'


class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div className="App">
        <Switch>
              <Route exact path="/" component={SignIn}/>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/profile" component={Profile} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

