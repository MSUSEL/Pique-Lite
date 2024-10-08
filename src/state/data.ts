/**
 * @fileoverview This module provides derived atoms that are useful for visualizing
 *               tabular data (e.g. for chart visualizations)
 */
import { State } from "./core";
import { atom, useAtomValue } from "jotai";

interface CharacteristicRecord extends Record<string, unknown> {
  name: string;
  fileName: string;
  date: Date;
  tqi: number;
}

interface ProjectRecord extends Record<string, unknown> {
  name: string;
  versions: Project;
}

// Note:
// This is an example of a pattern that should broadly be useful.
// We have a base atom `x` (in our case, State.project), but we need
// to perform a heavy computation, `f` on `x` in order to get
// data in a format we can use in our components. Instead of
// calling `useAtomValue(x)` in our component, then performing
// a computation `y = useMemo(() => f(x))` in many different components,
// we can define a derived atom using this computation:
// y = atom(get => f(get(x)))
//
// This will automatically cache the computation. Then
// we can work with the `y` atom directly.
// Read more here: https://jotai.org/docs/guides/composing-atoms
export const flatCharacteristicDataAtom = atom((get) => {
  const projects = get(State.projects);
  const selectedProject = get(State.selectedProject);

  //check to make sure there is a selected project
  if (!selectedProject || !projects) return [];
  const project = projects[selectedProject];

  if (!project) {
    return [];
  }

  const records: CharacteristicRecord[] = project.versions.map((version) => {
    const baseRecord = {
      name: version.name,
      fileName: version.fileName,
      date: version.date,
      tqi: version.data.value,
    };

    return version.data.children.reduce(
      (
        acc: Record<string, number>,
        child: {
          name: string;
          value: number;
        }
      ) => {
        acc[child.name] = child.value;
        return acc;
      },
      baseRecord
    );
  });

  console.log('records', records);
  return records;
});

// should work nearly identical to the above func
export const flatProjectsDataAtom = atom((get) => {

  const projects = get(State.projects);

  if (!projects) {
    return [];
  }

  const baseRecord = {
    name: 'project 1'
  };

  const records: CharacteristicRecord[] =  projects[Object.keys(projects)].versions.reduce(
    (acc: [Record<string, number>], current: any) => {
      acc.push({['project_1'] : current.data.value, ['name'] : current.name});
      return acc;
    }, [])

  console.log('my records', records);
  return records;
});