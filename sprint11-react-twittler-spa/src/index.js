import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // useNavigate 가 BrowserRouter안에 있어야 한다. 라우터가 최상위여야 에러안남
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
