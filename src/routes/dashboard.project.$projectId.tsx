import ProjectDetailsView from "../pages/ProjectDetailsView/ProjectDetailsView";
import type { Route } from "./+types/dashboard.project.$projectId";

export default function Component(props: Route.ComponentProps) {
  console.warn(`ROUTE PARAMS`, props.params);
  return <ProjectDetailsView projectId={props.params.projectId} />;
}

