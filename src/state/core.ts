import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { base } from "../schema";
/**
 * A "version" of a project
 */
interface Version {
  date: Date;
  name: string;
  fileName: string;
  data: base.Schema;
}

export interface Project {
  versions: Version[];
  name: string;
  uuid: string;
}

interface Projects {
  [uuid: string]: Project;
}

export const createNewProject = (projects: any, setProjects: Function) => {
  const newProjectId = uuidv4();
  setProjects((prevProjects: any) => ({
    ...prevProjects,
    [newProjectId]: { name: `Project ${Object.keys(prevProjects).length + 1}`, versions: [] },
  }));
  return newProjectId;
};

export function createState() {
  const currentView = atom<string>();

  const projects = atom<Projects | undefined>({});

  const selectedProject = atom<string | undefined>(undefined);
  const selectedVersion = atom<number | undefined>(undefined);
  return {
    currentView,
    projects,
    selectedProject,
    selectedVersion,
  };
}

export const State = createState();
