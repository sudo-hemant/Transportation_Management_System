import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

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
