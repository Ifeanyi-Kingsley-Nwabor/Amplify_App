import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

import NavBar from "./components/NavBar";
import AuthenticationFlow from "./components/AuthenticationFlow";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <AuthenticationFlow />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}
export default App;
