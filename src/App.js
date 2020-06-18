import React, { Component } from "react";
import {  BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login'
import Layout from './components/Layout'
// import "./styles/layout.scss";
// import "./styles/login.scss"
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Layout" component={Layout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
