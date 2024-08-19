import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { ToastProvider } from "rc-toastr";
import "rc-toastr/dist/index.css";
import LoginProvider from "./components/Context/LoginContext";
import AppProvider from "./components/Context/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <LoginProvider>
        <ToastProvider
          config={{
            position: "top-right",
            duration: 3000,
          }}
        >
          <App />
        </ToastProvider>
      </LoginProvider>
    </AppProvider>
  </React.StrictMode>
);
