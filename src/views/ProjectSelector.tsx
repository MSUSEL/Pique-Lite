import { useAtomValue, useAtom } from "jotai";
import { State } from "../state";

// FIXME: This is just a placeholder; it will be replaced
// by our project/version selection/search system.
export const ProjectSelector = () => {
  const projects = useAtomValue(State.projects);
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);

  if (!projects || !selectedProject) return null;

  const projectArray = Object.entries(projects);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          position: "absolute",
          top: "0",
          right: "0",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label htmlFor="project-select">Select Project: </label>

          <select
            id="project-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(String(e.target.value))}
            style={{ marginBottom: "5px" }}
          >
            {projectArray.map(([uuid, project]) => (
              <option key={uuid} value={uuid}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <text style={{ fontSize: "12px", color: "gray" }}>
          {"uuid: " + selectedProject}
        </text>
      </div>
    </div>
  );
};
