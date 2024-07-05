import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalState from "./context/index.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalState>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalState>
  </BrowserRouter>
);
