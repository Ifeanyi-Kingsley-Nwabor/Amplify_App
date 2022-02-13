import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { Switch, Route, Redirect } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Home from "./components/Home";

import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
import config from "./aws-exports";
Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className="App">
      {({ signOut, user }) => (
        <main>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>We now have Auth!</h1>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </header>
        </main>
      )}

      {/* <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch> */}
    </div>
  );
}
export default withAuthenticator(App);
