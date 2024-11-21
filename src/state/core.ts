import { atom } from "jotai";
import { base } from "../schema";
/**
 * A "version" of a project
 */
export interface Version {
  date: Date;
  name: string;
  fileName: string;
  data: base.Schema;
  uploadOrder: number;
}

export interface Project {
  versions: Version[];
  name: string;
  uuid: string;
}

interface Projects {
  [uuid: string]: Project;
}

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
