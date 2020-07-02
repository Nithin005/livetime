import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

class Root extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/register" exact component={SignUp} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    )
  }
}


ReactDOM.render(<Root />,document.getElementById('root'));

