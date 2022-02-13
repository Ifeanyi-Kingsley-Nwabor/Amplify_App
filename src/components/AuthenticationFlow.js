import React from "react";
import Dashboard from "./Dashboard";

import { Authenticator } from "@aws-amplify/ui-react";

function AuthFlow() {
  return (
    <>
      <Authenticator>
        {({ signOut, user }) => (
          <header className="App-header">
            <Dashboard />
          </header>
        )}
      </Authenticator>
    </>
  );
}
export default AuthFlow;
