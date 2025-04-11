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
  "/overview": {};
  "/about": {};
};