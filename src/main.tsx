import "./utils/sentry.js";
import React from "react";
import ReactDOM from "react-dom/client";
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
      <NextUIProvider>
        <main className="light text-foreground bg-background w-screen h-screen">
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </main>
      </NextUIProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
