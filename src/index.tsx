import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import Layout from "./layout/Layout";
import {ContextProvider} from "./hooks/useContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Layout>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Layout>
    </ContextProvider>
  </React.StrictMode>
);
