import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { DevTools } from "jotai-devtools";

// import "@radix-ui/themes/styles.css";
// import "./index.css";

if (process.env.NODE_ENV === "development") {
  import("jotai-devtools/styles.css");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* {process.env.NODE_ENV === "development" && <DevTools />} */}
    {/* <App /> */}
  </StrictMode>
);
