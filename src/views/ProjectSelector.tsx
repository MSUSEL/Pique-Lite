import { useAtomValue, useAtom } from "jotai";
import { State } from "../state";

// FIXME: This is just a placeholder; it will be replaced
// by our project/version selection/search system.
export const ProjectSelector = () => {
  const projects = useAtomValue(State.projects);
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);

  if (!projects) return null;

  const projectArray = Object.entries(projects);

  return (
    <div>
      <label htmlFor="project-select">Select Project: </label>
      <select
        id="project-select"
        value={selectedProject}
        onChange={(e) => setSelectedProject(String(e.target.value))}
      >
        {projectArray.map(([uuid, project]) => (
          <option key={uuid} value={uuid}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};
