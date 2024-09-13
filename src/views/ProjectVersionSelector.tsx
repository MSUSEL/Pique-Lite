import { useAtomValue, useAtom } from "jotai";
import { State } from "../state";

// FIXME: This is just a placeholder; it will be replaced
// by our project/version selection/search system.
export const ProjectVersionSelector = () => {
  const project = useAtomValue(State.project);
  const [selectedVersion, setSelectedVersion] = useAtom(State.selectedVersion);

  if (!project) return null;

  return (
    <div>
      <label htmlFor="version-select">Select Version: </label>
      <select
        id="version-select"
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(Number(e.target.value))}
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
