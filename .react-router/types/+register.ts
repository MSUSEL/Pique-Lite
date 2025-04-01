import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/dashboard": {};
  "/dashboard/project/:projectId": {
    "projectId": string;
  };
  "/dashboard/overview": {};
  "/about": {};
};