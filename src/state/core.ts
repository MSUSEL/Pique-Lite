import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { base } from "./schema";
/**
 * A "version" of a project
 */
export interface Version {
  date: Date;
  name: string;
  fileName: string;
  data: base.Schema;
  isHidden: boolean;
  versionId: string;
}

export interface Project {
  versions: Version[];
  name: string;
  uuid: string;
}

export interface Projects {
  [uuid: string]: Project;
}

export const createNewProject = (
  projects: Project[],
  setProjects: (updater: (prev: Project[]) => Project[]) => void
) => {
  const newProjectId = uuidv4();
  setProjects((prevProjects: Project[]) => ({
    ...prevProjects,
    [newProjectId]: {
      name: `Project ${Object.keys(prevProjects).length + 1}`,
      versions: [],
      uuid: newProjectId
    }
  }));
  return newProjectId;
};

export function createState() {
  const currentView = atom<string>();
  const projects = atom<Projects | undefined>({});

  const visibleProjects = atom((get) => {
    const projectsValue = get(projects);
    if (!projectsValue) return undefined;

    // Reduce through projects and filter visible versions
    const visibleProjects = Object.entries(projectsValue).reduce(
      (acc, [uuid, project]) => {
        const visibleVersions = (project.versions || []).filter(
          (version: Version) => !version.isHidden
        );

        // If there are visible versions, add them to the result
        if (visibleVersions.length > 0) {
          acc[uuid] = {
            ...project,
            versions: visibleVersions
          };
        }

        return acc;
      },
      {} as Projects
    );

    return visibleProjects;
  });

  return {
    currentView,
    projects,
    visibleProjects
  };
}

export const State = createState();
