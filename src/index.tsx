import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom";
import ProgressView from "./ProgressView";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProgressView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
