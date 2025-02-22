import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { ToastProvider } from "rc-toastr";
import "rc-toastr/dist/index.css";
import AppProvider from "./components/Context/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastProvider
      config={{
        position: "top-left",
        duration: 3000,
        toastBackgroundColor: (type) => {
          switch (type) {
            case "success":
              return "#28a745"; // Green
            case "error":
              return "#dc3545"; // Red
            case "warning":
              return "#ffc107"; // Yellow
            case "info":
              return "#091F5B"; // Blue
            default:
              return "#343a40"; // Dark
          }
        },
      }}
    >
      <AppProvider>
        <App />{" "}
      </AppProvider>
    </ToastProvider>
  </React.StrictMode>
);
