import "./utils/sentry.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";


// Components
import ErrorBoundary from "./Components/ErrorBoundary.js";
import App from "./App/App";
import AuthContextProvider from "./Context/Auth";
// Styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
      <NextUIProvider>
        <main className="light text-foreground bg-background w-svw h-svh">
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </main>
      </NextUIProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
