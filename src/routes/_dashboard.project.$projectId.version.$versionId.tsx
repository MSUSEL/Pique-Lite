import type { Route } from "./+types/_dashboard.project.$projectId.version.$versionId";

export default function Component(props: Route.ComponentProps) {
  return <div>Version {props.params.versionId}</div>;
}
