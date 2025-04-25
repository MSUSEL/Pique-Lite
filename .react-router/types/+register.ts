import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/versionDetails/project/:projectId/version/:versionId": {
    "projectId": string;
    "versionId": string;
  };
  "/project/:projectId": {
    "projectId": string;
  };
  "/overview": {};
  "/about": {};
};