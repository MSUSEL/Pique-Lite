import ProjectDetailsView from "../pages/ProjectDetailsView/ProjectDetailsView";
import type { Route } from "./+types/_dashboard.project.$projectId";

export default function Component(props: Route.ComponentProps) {
  return <ProjectDetailsView projectId={props.params.projectId} />;
}

