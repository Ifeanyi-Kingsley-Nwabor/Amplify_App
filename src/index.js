import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // default theme
import "materialize-css/dist/css/materialize.min.css";

import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
