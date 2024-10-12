import { z } from "zod";

export namespace base {
  const diagnostics = z.object({
    name: z.string(),
    value: z.number(),
  });

  const measures = z.object({
    name: z.string(),
    value: z.number(),
    children: z.array(diagnostics),
  });

  const factors = z.object({
    name: z.string(),
    value: z.number(),
    children: z.array(measures),
  });

  const aspects = z.object({
    name: z.string(),
    value: z.number(),
    children: z.array(factors),
  });

  /*
   * 'dataset' contains nested values aspects through diagnostics
   * and as such is organized with the main TQI being labeled 'dataset'
   * with the next layer being aspects, which contains factors, so on
   * and so forth. Diagnostics is the lowest level, and as such contains
   * no children, only the name and value
   */
  export const dataset = z.object({
    name: z.string(),
    value: z.number(),
    children: z.array(aspects),
  });

  export type Schema = z.infer<typeof dataset>;
}
