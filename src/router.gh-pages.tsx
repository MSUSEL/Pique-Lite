import React from "react";
import { createHashRouter, Navigate } from "react-router-dom";

import Root from "./root";

import IndexRoute from "./routes/_index";
import DashboardLayout from "./routes/_dashboard";
import OverviewRoute from "./routes/_dashboard.overview";
import ProjectRoute from "./routes/_dashboard.project.$projectId";
import VersionDetailsRoute from "./routes/_dashboard.versionDetails.project.$projectId.version.$versionId";
import SettingsRoute from "./routes/_dashboard.settings";
import AboutRoute from "./routes/about";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Landing: /#/
      { index: true, element: <IndexRoute /> },

      // About
      { path: "about", element: <AboutRoute /> },

      // Dashboard: /#/dashboard/...
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <OverviewRoute /> },

          // /#/dashboard/project/<projectId>
          { path: "project/:projectId", element: <ProjectRoute /> },

          // /#/dashboard/versionDetails/project/<projectId>/version/<versionId>
          {
            path: "versionDetails/project/:projectId/version/:versionId",
            element: <VersionDetailsRoute />,
          },

          { path: "settings", element: <SettingsRoute /> },
        ],
      },

      // 兜底：未知路径回 Landing
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
