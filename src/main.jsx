import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Contexts
import { UserNameProvider } from "./contexts/userName";
import { ChosenDifficultyProvider } from "./contexts/difficulty";
import { SelectedCategoriesProvider } from "./contexts/selectedCategories";
// React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import './index.css'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserNameProvider>
      <ChosenDifficultyProvider>
        <SelectedCategoriesProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SelectedCategoriesProvider>
      </ChosenDifficultyProvider>
    </UserNameProvider>
  </React.StrictMode>
);
