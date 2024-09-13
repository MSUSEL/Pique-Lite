import { z } from "zod";

/**
 * Defines the new utility function structure, including both required fields (name, description)
 * and optional fields (benchmarkTag, utilityFunctionImageURIs, benchmarkQualityMetrics,
 * utilityFunctionQualityMetrics, sensitivityAnalysisResults). It allows for detailed specification
 * of utility functions beyond a simple name string, incorporating benchmarks, quality metrics, and
 * sensitivity analysis results.
 *
 * Example: {
 *   name: "name",
 *   description: "description",
 *   benchmarkTag: "benchmarkTag",
 *   utilityFunctionImageURIs: { "imageURIDescription1": "/image/uri/image1.json" },
 *   benchmarkQualityMetrics: { "benchmarkQualityMetric1": "42" },
 *   utilityFunctionQualityMetrics: { "utilityFunctionQualityMetric1": "42" },
 *   sensitivityAnalysisResults: { "sensitivityAnalysisResult1": "42" }
 * }
 */
const utilityFunctionNewStructure = z.object({
  //required
  name: z.string(),
  description: z.string(),
  //optional
  benchmarkTag: z.string().optional(),
  utilityFunctionImageURIs: z.record(z.string(), z.string()).optional(),
  benchmarkQualityMetrics: z
    .record(z.string(), z.union([z.string(), z.number()]))
    .optional(),
  utilityFunctionQualityMetrics: z
    .record(z.string(), z.union([z.string(), z.number()]))
    .optional(),
  sensitivityAnalysisResults: z
    .record(z.string(), z.union([z.string(), z.number()]))
    .optional(),
});

// Utility function schema: define 2 versions to accept both the old (only a string) and new (a nested structure) format
const utilityFunctionSchema = z.union([
  z.string(),
  utilityFunctionNewStructure,
]);

// Define the new structure of evaluation strategy
const evalStrategyNewStructure = z.object({
  //required
  name: z.string(),
  description: z.string(),
  //optional
});

// Evaluation Strategy function schema: define 2 versions to accept both the old (only a string) and new (a nested structure) format
const evalStrategySchema = z.union([z.string(), evalStrategyNewStructure]);

// Define the new structure of normalizer
const normalizerNewStructure = z.object({
  //required
  name: z.string(),
  description: z.string(),
  //optional
});

// Normalizer schema: define 2 versions to accept both the old (only a string) and new (a nested structure) format
const normalizerSchema = z.union([z.string(), normalizerNewStructure]);

export namespace base {
  /**
   * Defines a single factor within the dataset,
   * there are 3 sub-categories of factores: tqi (Total Quality Index), quality_aspects, and product_factors,
   * the single factor includes its name, value, evaluation strategy,
   * normalizer, utility function, description, and weights.
   * Factors are key components in assessing the overall quality of the product.
   * Example: {
   *   name: "Category CWE-1211",
   *   value: 1.0,
   *   eval_strategy: "evaluator.WeightedAverageEvaluator",
   *   normalizer: "pique.evaluation.DefaultNormalizer",
   *   utility_function: { ...utilityFunctionExample },
   *   description: "",
   *   weights: { "CVE-CWE-294 Measure": 0.1, ... }
   * }
   */
  export const factorSingle = z.object({
    name: z.string(),
    value: z.number(),
    eval_strategy: evalStrategySchema, //z.string(),
    normalizer: normalizerSchema, //z.string(),
    utility_function: utilityFunctionSchema,
    description: z.string(),
    weights: z.record(z.string(), z.number()),
  });

  /**
   * Represents a single measure within the dataset, detailing the measure's name, description,
   * evaluation strategy, normalizer, positivity, thresholds, utility function, value, and weights.
   * Example: {
   *   name: "CVE-CWE-1021 Measure",
   *   description: "",
   *   eval_strategy: "pique.evaluation.DefaultMeasureEvaluator",
   *   normalizer: "pique.evaluation.DefaultNormalizer",
   *   positive: false,
   *   thresholds: [0.0, 0.0],
   *   utility_function: "evaluator.BinaryUtility",
   *   value: 1,
   *   weights: { "CVE-CWE-1021 Diagnostic": 1.0 }
   * }
   */

  export const measureSingle = z.object({
    name: z.string(),
    description: z.string(),
    eval_strategy: evalStrategySchema, //z.string(),
    normalizer: normalizerSchema, //z.string(),
    positive: z.boolean(),
    thresholds: z.tuple([z.number(), z.number()]),
    utility_function: utilityFunctionSchema,
    value: z.number(),
    weights: z.record(z.string(), z.number()),
  });

  /**
   * Schema for a single diagnostic entry in the dataset, including its description, evaluation strategy,
   * name, normalizer, tool name, utility function, value, and weights. Diagnostics provide detailed
   * evaluations of specific aspects.
   * Example: {
   *   name: "CVE-CWE-915 Diagnostic",
   *   description: "CVE findings of type CWE-915",
   *   eval_strategy: "pique.evaluation.DefaultDiagnosticEvaluator",
   *   normalizer: "pique.evaluation.DefaultNormalizer",
   *   toolName: "cve-bin-tool",
   *   utility_function: { ...utilityFunctionExample },
   *   value: 0.0,
   *   weights: {}
   * }
   */

  export const diagnosticsSingle = z.object({
    description: z.string(),
    eval_strategy: evalStrategySchema, //z.string(),
    name: z.string(),
    normalizer: normalizerSchema, //z.string(),
    toolName: z.string(),
    utility_function: utilityFunctionSchema,
    value: z.number(),
    weights: z.record(z.string(), z.number()),
  });

  // The overall schema for the dataset```typescript
  /**
   * Defines the overall structure of the "Binary Security Quality Model" dataset. This schema validates and parses the comprehensive JSON structure,
   * encapsulating global configurations, additional data, factors (including product factors, quality aspects, and tqi), measures, and diagnostics.
   * Each component is defined to ensure data integrity and facilitate understanding of the model's complexity.
   *
   * Example: {
   *   name: "Binary Security Quality Model CWE-699",
   *   measures: { "CVE-CWE-1021 Measure": { ...measureExample }, "CVE-CWE-385 Measure": { ...measureExample } },
   *   global_config: { "benchmark_strategy": "calibration.BinaryBenchmarker", ... },
   *   factors: { "product_factors": { "Category CWE-1211": { ...factorExample }, ... }, ... },
   *   additionalData: { "projectName": "busybox-1.21.1_busybox_unstripped_x86_64" },
   *   diagnostics: { "CVE-CWE-915 Diagnostic": { ...diagnosticExample }, ... }
   * }
   */

  export const dataset = z.object({
    name: z.string(),
    global_config: z.record(z.any()),
    additionalData: z.record(z.any()),
    factors: z.record(z.record(factorSingle)),
    measures: z.record(measureSingle),
    diagnostics: z.record(diagnosticsSingle),
  });

  export type Schema = z.infer<typeof dataset>;
}
