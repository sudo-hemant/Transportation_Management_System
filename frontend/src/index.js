import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App";


ReactDOM.render(

    <BrowserRouter>
      <React.StrictMode>
        <App id="test" />
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById("root")
);

// Thisissignup@20