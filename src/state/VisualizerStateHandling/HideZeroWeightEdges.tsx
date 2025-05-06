import * as schema from "../../state/visualizerSchema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

function filterOutZeroWeights(obj: Record<string, FilterableItem>): Record<string, FilterableItem> {
 
    //if (!hiddingStatus) return obj;

    let droppedPairsCount = 0; // Counter for dropped pairs

    Object.keys(obj).forEach(key => {
        const item = obj[key];
        if (item.weights) {
            // Count the pairs with value 0 before filtering
            droppedPairsCount += Object.values(item.weights).filter(value => value === 0).length;

            // Filter out the key-value pairs where value is 0
            const filteredWeights = Object.fromEntries(
                Object.entries(item.weights).filter(([, value]) => {
                    if (value === 0) {
                        droppedPairsCount++; // Increment the counter if a pair is dropped
                        return false; // Filter out this pair
                    }
                    return true;
                })
            );

            // Update the weights object with the filtered weights
            item.weights = filteredWeights;
        }
    });

    console.log(`Dropped ${droppedPairsCount} weight(s) = 0 pairs`); // Log the count of dropped pairs

    return obj;
}



export function hideZeroWeightEdges(dataset: schema.base.Schema | undefined, hideZeroWeightEdgeState: boolean): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    // Clone the dataset
    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    // Apply filtering based on hideZeroWeightEdgeState
    if (hideZeroWeightEdgeState) {
        filteredDataset.factors.product_factors = filterOutZeroWeights(filteredDataset.factors.product_factors);
        filteredDataset.factors.quality_aspects = filterOutZeroWeights(filteredDataset.factors.quality_aspects);
        filteredDataset.factors.tqi = filterOutZeroWeights(filteredDataset.factors.tqi);
        filteredDataset.measures = filterOutZeroWeights(filteredDataset.measures);
        filteredDataset.diagnostics = filterOutZeroWeights(filteredDataset.diagnostics);
    }

    return filteredDataset;
}