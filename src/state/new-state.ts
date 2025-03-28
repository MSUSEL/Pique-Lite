import { atom } from "jotai";
import { VisualizerState } from "./visualizer-state";
import {Version} from "./core"

// Atom of projects
export const projectsAtom = atom<Record<
  string, // Project ID
  {
    name: string;
    versions: Record<
      string, // Version ID
      {
        name: string;
        fileName: string;
        date: Date;
        state: typeof VisualizerState;
        isHidden: boolean;
      }
    >;
  }
>>({});

// Function to create a new project
export const createProjectAtom = atom(
  null,
  (get, set, { projectID, projectName }) => {
    const projects = get(projectsAtom);
    set(projectsAtom, {
      ...projects,
      [projectID]: { name: projectName, versions: {} },
    });
  }
);

// Function to delete a project (removes all associated versions)
export const deleteProjectAtom = atom(
  null,
  (get, set, projectID: string) => {
    const projects = get(projectsAtom);
    const newProjects = { ...projects };
    delete newProjects[projectID];
    set(projectsAtom, newProjects);
  }
);

// Function to create a version inside a project
//      Assumes we already know versionID might be issue?
//      In visualizer, since there is only ever one file being checked at a time, it manipulates the schema through other files. How are we going to manage it here?
export const createVersionAtom = atom(
  null,
  (get, set, { projectID, versionID, versionName }) => {
    const projects = get(projectsAtom);
    if (!projects[projectID]) return; // Ensure project exists

    set(projectsAtom, {
      ...projects,
      [projectID]: {
        ...projects[projectID],
        versions: {
          ...projects[projectID].versions,
          // Update the following for structure of Version
          [versionID]: { },
        },
      },
    });
  }
);

// Function to delete a version
export const deleteVersionAtom = atom(
  null,
  (get, set, { projectID, versionID }) => {
    const projects = get(projectsAtom);
    if (!projects[projectID]) return; // Ensure project exists

    const newVersions = { ...projects[projectID].versions };
    delete newVersions[versionID];

    set(projectsAtom, {
      ...projects,
      [projectID]: { ...projects[projectID], versions: newVersions },
      
    });
  }
);

// Function to retrieve the version information of a specific project and version (includes the state)
//      Should this return the state itself?
export function UseData(projectID: string, versionID: string) {
  return atom((get) => {
    const projects = get(projectsAtom);
    return projects[projectID]?.versions[versionID];
  });
}

// Need function to retrieve the transformed state of a specific project
export function UseLiteData(projectID: string, versionID: string) {
    return atom((get) => {
    
    });
}