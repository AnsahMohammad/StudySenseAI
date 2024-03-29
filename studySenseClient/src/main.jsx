import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "./LoginPage";
import Menu from "./Menu";
import "./Styling/page.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Menu />} />
      <Route path="*" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
