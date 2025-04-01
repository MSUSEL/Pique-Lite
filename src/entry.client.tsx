import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { DevTools } from "jotai-devtools";
import { HydratedRouter } from "react-router/dom";
import "@radix-ui/themes/styles.css";
import "./index.css";
import ReactDOM from "react-dom/client";

if (process.env.NODE_ENV === "development") {
  import("jotai-devtools/styles.css");
}

ReactDOM.hydrateRoot(
  document,
  <StrictMode>
    {/* {process.env.NODE_ENV === "development" && <DevTools />} */}
    <HydratedRouter />
  </StrictMode>
);
