import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { base as liteBase } from "./schema";
import { base as vizBase } from "./visualizerSchema";

type LiteDataset = z.infer<typeof liteBase.dataset>;
type VisualizerDataset = z.infer<typeof vizBase.dataset>;

const DEFAULT_EVAL = "evaluator.WeightedAverageEvaluator";
const DEFAULT_NORMALIZER = "pique.evaluation.DefaultNormalizer";
const DEFAULT_UTILITY = "pique.evaluation.DefaultUtility";

const makeEvenWeights = (keys: string[]) => {
  if (!keys.length) return {};
  const weight = 1 / keys.length;
  return keys.reduce<Record<string, number>>((acc, key) => {
    acc[key] = weight;
    return acc;
  }, {});
};

/**
 * Convert a lite tree (children arrays) into the richer visualizer schema.
 * We synthesize weights evenly across children and fill evaluation metadata
 * with sensible defaults so the visualizer UI has everything it expects.
 */
export const liteToVisualizer = (dataset: LiteDataset): VisualizerDataset => {
  const quality_aspects: Record<string, any> = {};
  const product_factors: Record<string, any> = {};
  const measures: Record<string, any> = {};
  const diagnostics: Record<string, any> = {};

  for (const aspect of dataset.children ?? []) {
    const factorKeys = (aspect.children ?? []).map((f) => f.name);
    const aspectWeights = makeEvenWeights(factorKeys);
    quality_aspects[aspect.name] = {
      name: aspect.name,
      value: aspect.value ?? 0,
      description: "",
      weights: aspectWeights,
      eval_strategy: DEFAULT_EVAL,
      normalizer: DEFAULT_NORMALIZER,
      utility_function: DEFAULT_UTILITY
    };

    for (const factor of aspect.children ?? []) {
      const measureKeys = (factor.children ?? []).map((m) => m.name);
      const factorWeights = makeEvenWeights(measureKeys);
      product_factors[factor.name] = {
        name: factor.name,
        value: factor.value ?? 0,
        description: "",
        weights: factorWeights,
        eval_strategy: DEFAULT_EVAL,
        normalizer: DEFAULT_NORMALIZER,
        utility_function: DEFAULT_UTILITY
      };

      for (const measure of factor.children ?? []) {
        const diagnosticKeys = (measure.children ?? []).map((d) => d.name);
        const measureWeights = makeEvenWeights(diagnosticKeys);
        measures[measure.name] = {
          name: measure.name,
          description: "",
          eval_strategy: DEFAULT_EVAL,
          normalizer: DEFAULT_NORMALIZER,
          positive: true,
          thresholds: [0, 0],
          utility_function: DEFAULT_UTILITY,
          value: measure.value ?? 0,
          weights: measureWeights
        };

        for (const diagnostic of measure.children ?? []) {
          diagnostics[diagnostic.name] = {
            description: "",
            eval_strategy: DEFAULT_EVAL,
            name: diagnostic.name,
            normalizer: DEFAULT_NORMALIZER,
            toolName: "unknown",
            utility_function: DEFAULT_UTILITY,
            value: diagnostic.value ?? 0,
            weights: {}
          };
        }
      }
    }
  }

  const tqiWeights = makeEvenWeights(Object.keys(quality_aspects));
  const tqiName = dataset.name || "Total Quality";
  const tqiValue = dataset.value ?? 0;

  return {
    name: dataset.name || "Dataset",
    global_config: {},
    additionalData: {},
    factors: {
      tqi: {
        [tqiName]: {
          name: tqiName,
          value: tqiValue,
          description: "",
          weights: tqiWeights,
          eval_strategy: DEFAULT_EVAL,
          normalizer: DEFAULT_NORMALIZER,
          utility_function: DEFAULT_UTILITY
        }
      },
      quality_aspects,
      product_factors
    },
    measures,
    diagnostics
  };
};

/**
 * Convert visualizer schema back to the lite tree.
 * We follow weights to understand relationships when possible.
 */
export const visualizerToLite = (dataset: VisualizerDataset): LiteDataset => {
  const tqiEntries = dataset.factors?.tqi
    ? Object.values(dataset.factors.tqi)
    : [];
  const rootTqi = tqiEntries[0];
  const rootValue = rootTqi?.value ?? 0;
  const aspectKeys = rootTqi?.weights
    ? Object.keys(rootTqi.weights)
    : Object.keys(dataset.factors?.quality_aspects || {});

  const aspects = aspectKeys
    .map((aspectKey) => dataset.factors?.quality_aspects?.[aspectKey])
    .filter(Boolean)
    .map((aspect) => {
      const factorKeys = Object.keys(aspect.weights || {}).length
        ? Object.keys(aspect.weights)
        : Object.keys(dataset.factors.product_factors || {});

      const factors = factorKeys
        .map((fk) => dataset.factors.product_factors?.[fk])
        .filter(Boolean)
        .map((factor) => {
          const measureKeys = Object.keys(factor.weights || {}).length
            ? Object.keys(factor.weights)
            : Object.keys(dataset.measures || {});

          const measures = measureKeys
            .map((mk) => dataset.measures?.[mk])
            .filter(Boolean)
            .map((measure) => {
              const diagKeys = Object.keys(measure.weights || {});
              const diags = diagKeys
                .map((dk) => dataset.diagnostics?.[dk])
                .filter(Boolean)
                .map((diag) => ({
                  name: diag.name,
                  value: diag.value
                }));

              return {
                name: measure.name,
                value: measure.value,
                children: diags
              };
            });

          return {
            name: factor.name,
            value: factor.value,
            children: measures
          };
        });

      return {
        name: aspect.name,
        value: aspect.value,
        children: factors
      };
    });

  return {
    name: dataset.name || rootTqi?.name || "Dataset",
    value: rootValue,
    children: aspects,
    date: undefined
  };
};

export type ParsedDataset = {
  raw: VisualizerDataset | LiteDataset;
  processed: VisualizerDataset;
  lite: LiteDataset;
  source: "visualizer" | "lite";
};

/**
 * Attempt to parse uploaded content into either visualizer or lite schema,
 * and return both the raw view and a processed/visualizer-ready view.
 */
export const parseDataset = (data: any): ParsedDataset => {
  try {
    const processed = vizBase.dataset.parse(data);
    const lite = visualizerToLite(processed);
    return { raw: processed, processed, lite, source: "visualizer" };
  } catch (vizErr) {
    try {
      const liteRaw = liteBase.dataset.parse(data);
      const processed = liteToVisualizer(liteRaw);
      return { raw: liteRaw, processed, lite: liteRaw, source: "lite" };
    } catch (liteErr) {
      // Format both errors nicely using zod-validation-error
      const vizValidationError = vizErr instanceof z.ZodError
        ? fromZodError(vizErr, {
            prefix: "Visualizer schema",
            maxIssuesInMessage: 5,
          })
        : vizErr;

      const liteValidationError = liteErr instanceof z.ZodError
        ? fromZodError(liteErr, {
            prefix: "Lite schema",
            maxIssuesInMessage: 5,
          })
        : liteErr;

      throw new Error(
        `File does not match expected PIQUE dataset format.\n\n${vizValidationError}\n\n${liteValidationError}`
      );
    }
  }
};
