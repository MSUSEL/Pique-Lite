import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router.gh-pages";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
