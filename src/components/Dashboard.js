import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

const Dashboard = () => {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user.username}</h1>
            <h3>Welcome to the Dash board</h3>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default Dashboard;
