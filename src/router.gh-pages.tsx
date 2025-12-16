import React from "react";
import { createHashRouter } from "react-router-dom";

import Root from "./root";
import Landing from "./pages/Landing/Landing";

import DashboardLayout from "./routes/_dashboard";
import OverviewRoute from "./routes/_dashboard.overview";
import SettingsRoute from "./routes/_dashboard.settings";
import ProjectRoute from "./routes/_dashboard.project.$projectId";
import VersionDetailsRoute from "./routes/_dashboard.versionDetails.project.$projectId.version.$versionId";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Landing /> },

      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OverviewRoute /> },
          { path: "overview", element: <OverviewRoute /> },
          { path: "settings", element: <SettingsRoute /> },
          { path: "project/:projectId", element: <ProjectRoute /> },
          {
            path: "versionDetails/project/:projectId/version/:versionId",
            element: <VersionDetailsRoute />,
          },
        ],
      },
    ],
  },
]);
