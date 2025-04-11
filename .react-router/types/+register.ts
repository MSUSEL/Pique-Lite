import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/project/:projectId": {
    "projectId": string;
  };
  "/project/:projectId/version/:versionId": {
    "projectId": string;
    "versionId": string;
  };
  "/overview": {};
  "/about": {};
};