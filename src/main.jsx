import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Contexts
import { UserNameProvider } from "./contexts/userName";

// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserNameProvider>
      <App />
    </UserNameProvider>
  </React.StrictMode>
);
