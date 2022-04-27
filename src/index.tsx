import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom";
import ProgressView from "./ProgressView";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProgressView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
