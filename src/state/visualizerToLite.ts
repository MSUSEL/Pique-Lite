import { z } from "zod";
import { base as baseLite } from "../state/schema"
import { base as baseVisual } from "../visualizer-schema"

type Dataset = baseLite.Schema;
type Aspect = Dataset['children'][0];
type Factor = Aspect['children'][0];
type Measure = Factor['children'][0];
type Diagnostic = Measure['children'][0];

export function convertVisualToLite(data: z.infer<typeof baseVisual.dataset>): z.infer<typeof baseLite.dataset> | null {
    // Setting up root data
    const newDataset: Dataset = {
        name: data.name,
        value: data.factors?.tqi?.["Binary Security Quality"].value,
        date: new Date().toISOString().split("T")[0],
        children: [],
      };
    
    // Setting up Aspects
    for (const aspectKey in data.factors?.quality_aspects) {
        const quality_aspect = data.factors.quality_aspects[aspectKey];
    
        const aspect: Aspect = {
            name: quality_aspect.name,
            value: quality_aspect.value ?? 0,
            children: [],
        };

        // Setting up Factors
        for (const weightKey in quality_aspect.weights) {
            const weight = quality_aspect.weights[weightKey]

            const factor: Factor = {
                name: weightKey,
                value: weight,
                children: [],
            };

            // Setting up Measures
            for(const measureKey in data.factors?.product_factors[factor.name].weights) {
                const value = data.factors?.product_factors[factor.name].weights[measureKey]

                const measure: Measure = {
                    name: measureKey,
                    value: value,
                    children: [],
                }

                // Setting up Diagnostic
                const diagnosticName = measureKey.replace("Measure", "Diagnostic");

                const diagnosticValue = data.diagnostics?.[diagnosticName]?.value;
                
                if (diagnosticValue !== undefined) {
                    const diagnostic: Diagnostic = {
                        name: diagnosticName,
                        value: diagnosticValue,
                    };
                
                    measure.children.push(diagnostic);
                }  

                factor.children.push(measure)
            }

            aspect.children.push(factor);
        }
    
        newDataset.children.push(aspect);
    }

    return newDataset
}
