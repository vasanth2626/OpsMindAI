// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind entry
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      {/* ✅ Global Toast Provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827", // card
            color: "#E5E7EB",
            border: "1px solid #1F2937",
            fontSize: "0.9rem",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#0B1120",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#0B1120",
            },
          },
        }}
      />
    </>
  </React.StrictMode>
);