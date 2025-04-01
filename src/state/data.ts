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

// Hook to get flat characteristic data for a specific project
export const useFlatCharacteristicData = (projectId: string | undefined) => {
  const projects = useAtomValue(State.projects);

  //check to make sure there is a project id and projects
  if (!projectId || !projects) {
    return [];
  }
  const project = projects[projectId];

  if (!project) {
    return [];
  }

  const records: CharacteristicRecord[] = project.versions.map((version) => {
    const baseRecord: CharacteristicRecord = {
      name: version.name,
      fileName: version.fileName,
      date: version.date,
      tqi: version.data.value,
    };

    return version.data.children.reduce(
      (acc: CharacteristicRecord, child: { name: string; value: number }) => {
        acc[child.name] = child.value;
        return acc;
      },
      baseRecord
    );
  });

  return records;
};

interface ProjectVersionRecord extends Record<string, unknown> {
  projectName: string;
  projectId: string;
  name: string;
  fileName: string;
  date: Date;
  tqi: number;
}

export const flatAllProjectVersionsAtom = atom((get) => {
  const projects = get(State.projects);

  if (!projects) return [];

  const records: ProjectVersionRecord[] = Object.entries(projects).flatMap(
    ([projectId, project]) => {
      // Map each version in the project to a record
      return project.versions.map((version) => {
        // Create base record with project info
        const baseRecord = {
          projectName: project.name,
          projectId: project.uuid,
          name: version.name,
          fileName: version.fileName,
          date: version.date,
          tqi: version.data.value,
        };

        // Add all child characteristics
        return version.data.children.reduce(
          (
            acc: Record<string, unknown>,
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
    }
  );

  // Sort by date
  return records.sort((a, b) => a.date.getTime() - b.date.getTime());
});
