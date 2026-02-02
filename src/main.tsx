import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./theme";
import { siteConfig } from "./config/site";
import "./global.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  document.title = siteConfig.siteName;
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element '#root' not found");
}
