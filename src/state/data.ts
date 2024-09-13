/**
 * @fileoverview This module provides derived atoms that are useful for visualizing
 *               tabular data (e.g. for chart visualizations)
 */
import { State } from "./core";
import { atom } from "jotai";

interface CharacteristicRecord extends Record<string, unknown> {
  name: string;
  date: Date;
  tqi: number;
}
export const flatCharacteristicDataAtom = atom((get) => {
  const project = get(State.project);

  if (!project) {
    return [];
  }

  const records: CharacteristicRecord[] = project.versions.map((version) => {
    const baseRecord = {
      name: version.name,
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

  return records;
});
