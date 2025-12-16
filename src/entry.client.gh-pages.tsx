import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// ✅ 确保 GH Pages 有样式
import "./globals.css";
import "./index.css";
import "./root.css";

import { router } from "./router.gh-pages";

// ✅ 兜底：某些产物/依赖会读全局 React（否则就会报 React is not defined）
(globalThis as any).React = React;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
