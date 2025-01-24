import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { base } from "../schema";
/**
 * A "version" of a project
 */
export interface Version {
  date: Date;
  name: string;
  fileName: string;
  data: base.Schema;
  isHidden: boolean;
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
  setProjects: Function
) => {
  const newProjectId = uuidv4();
  setProjects((prevProjects: Project[]) => ({
    ...prevProjects,
    [newProjectId]: {
      name: `Project ${Object.keys(prevProjects).length + 1}`,
      versions: [],
      uuid: newProjectId,
    },
  }));
  return newProjectId;
};

export function createState() {
  const currentView = atom<string>();
  const projects = atom<Projects | undefined>({});
  const selectedProject = atom<string | undefined>(undefined);
  const selectedVersion = atom<number | undefined>(undefined);

  // Create a derived atom that updates selectedVersion when selectedProject changes
  const selectedProjectWithVersion = atom(
    (get) => get(selectedProject),
    (get, set, newProjectId: string | undefined) => {
      set(selectedProject, newProjectId);
      if (newProjectId) {
        const projectsValue = get(projects);
        const project = projectsValue?.[newProjectId];
        if (project && project.versions.length > 0) {
          set(selectedVersion, project.versions.length - 1);
        } else {
          set(selectedVersion, undefined);
        }
      } else {
        set(selectedVersion, undefined);
      }
    }
  );

  return {
    currentView,
    projects,
    selectedProject: selectedProjectWithVersion,
    selectedVersion,
  };
}

export const State = createState();
