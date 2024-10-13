import { useAtomValue, useAtom } from "jotai";
import { State } from "../state";

// FIXME: This is just a placeholder; it will be replaced
// by our project/version selection/search system.
export const VersionSelector = () => {
  const projects = useAtomValue(State.projects);
  const selectedProject = useAtomValue(State.selectedProject);
  if (!projects || !selectedProject) return null;
  const project = projects[selectedProject];
  const [selectedVersion, setSelectedVersion] = useAtom(State.selectedVersion);

  if (!project) return null;

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      position: "relative",
      width: "100%",
      top: "0",
      right: "0",
      margin: "10px",
    }}>
      <label htmlFor="version-select">Select Version: </label>
      <select
        id="version-select"
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(Number(e.target.value))}
        style={{ margin: "0 5px 5px", width: "150px" }}
      >
        {project.versions.map((version, index) => (
          <option key={version.name} value={index}>
            {version.name}
          </option>
        ))}
      </select>
    </div>
  );
};
