import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Contexts
import { UserNameProvider } from "./contexts/userName";
import { ChosenDifficultyProvider } from "./contexts/difficulty";

// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserNameProvider>
      <ChosenDifficultyProvider>
        <App />
      </ChosenDifficultyProvider>
    </UserNameProvider>
  </React.StrictMode>
);
