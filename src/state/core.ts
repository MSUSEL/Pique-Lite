import { atom } from "jotai";

/**
 * A "version" of a project
 */
interface Version {
  date: Date;
  name: string;
  fileName: string;
  // TODO: Add schema for data here.
  // NOTE: This `any` is a placeholder, we don't want to do things like this
  // generally.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface Project {
  versions: Version[];
  name: string;
  uuid: string;
  // TODO: We probably need other metadata here, e.g. project name
}

interface Projects {
  [uuid: string]: Project;
}

export function createState() {
  const currentView = atom<string>();
  // TODO: We are only defining a single project. Instead,
  // we need to define an atom `projects` which could simply
  // be `Project[]`:
  // const projects = atom<Project[]>([]);
  // Then we can define an index atom, `selectedProjectIdx`,
  // and lastly, update `project`:
  // const project = atom<Project|undefined>(get => get(projects)[get(selectedProjectIdx)])
  // ^ in this, get(selectedProjectIdx) might be undefined, so we have to handle that case.
  const projects = atom<Projects | undefined>({});

  // TODO: Instead of initializing to 0, we should do the following:
  // const selectedVersion = atom<number|undefined>(undefined);
  // Here, undefined represents the state where no version is selected.
  // To apply this change, we will need to handle the undefined case
  // in `ProjectVersionSelector` and other places where this is used.
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
