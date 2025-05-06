import { StrictMode } from "react";
import "./globals.css";
import { DevTools } from "jotai-devtools";
import { HydratedRouter } from "react-router/dom";
import ReactDOM from "react-dom/client";

import "./globals.css";
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
