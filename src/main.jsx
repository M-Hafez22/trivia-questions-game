import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Contexts
import { UserNameProvider } from "./contexts/userName";
import { ChosenDifficultyProvider } from "./contexts/difficulty";
import { SelectedCategoriesProvider } from "./contexts/selectedCategories";
import { ScoreProvider } from "./contexts/scoreContext";
import { ThemeProvider } from "./contexts/theme";
// React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/main.scss";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserNameProvider>
        <ChosenDifficultyProvider>
          <SelectedCategoriesProvider>
            <ScoreProvider>
              <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </ScoreProvider>
          </SelectedCategoriesProvider>
        </ChosenDifficultyProvider>
      </UserNameProvider>
    </ThemeProvider>
  </React.StrictMode>
);
