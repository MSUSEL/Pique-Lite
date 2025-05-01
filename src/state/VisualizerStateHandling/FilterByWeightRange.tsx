import * as schema from "../../state/visualizerSchema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

// by weight range 
function filterWeights(obj: Record<string, FilterableItem>, range: [number, number]): Record<string, FilterableItem> {
    // console.log(`Filtering weights by range: ${range[0]} to ${range[1]}`);

    return Object.fromEntries(
        Object.entries(obj).map(([key, item]) => {
            // console.log(`Processing item: ${key}`);
            const filteredWeights = Object.fromEntries(
                Object.entries(item.weights).filter(([weightKey, weightValue]) => {
                    const isIncluded = weightValue >= range[0] && weightValue <= range[1];
                    //console.log(`Weight '${weightKey}': ${weightValue} is ${isIncluded ? 'kept' : 'removed'}`);
                    return isIncluded;
                })
            );

            // console.log(`Original weights:`, item.weights);
            // console.log(`Filtered weights for '${key}':`, filteredWeights);
            return [key, {...item, weights: filteredWeights}];
        })
    );
}

function checkChildren(RefObj: Record<string, FilterableItem>, FilterObj: Record<string, FilterableItem>): Record<string, FilterableItem> {
    // Step 1: Create a dictionary of all weight keys from RefObj's subobjects
    let weightKeyDictionary = new Set<string>();
    Object.values(RefObj).forEach(item => {
        Object.keys(item.weights).forEach(weightKey => {
            weightKeyDictionary.add(weightKey);
        });
    });

    // Step 2: Filter out subobjects in FilterObj if their names are not in the dictionary
    const filteredFilterObj = Object.fromEntries(
        Object.entries(FilterObj).filter(([key, subObj]) => weightKeyDictionary.has(subObj.name))
    );

    return filteredFilterObj;
}



// exported functions: 

export function filterByWeightRange(
    dataset: schema.base.Schema | undefined, 
    minWeight: number, 
    maxWeight: number
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));
    const filterRange: [number, number] = [minWeight, maxWeight];

    /*
    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByWeightRange(
        filteredDataset.factors.product_factors, 
        filteredDataset.measures, 
        minWeight, 
        maxWeight
    );
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByWeightRange(
        filteredDataset.factors.quality_aspects, 
        filteredDataset.factors.product_factors, 
        minWeight, 
        maxWeight
    );
   
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByWeightRange(
        filteredDataset.factors.tqi, 
        filteredDataset.factors.quality_aspects, 
        minWeight, 
        maxWeight
    );
     */

    // filtering weights
    filteredDataset.factors.tqi = filterWeights(filteredDataset.factors.tqi, filterRange);
    filteredDataset.factors.quality_aspects = filterWeights(filteredDataset.factors.quality_aspects, filterRange);
    filteredDataset.factors.product_factors = filterWeights(filteredDataset.factors.product_factors, filterRange);

    // filtering objects who are not in any parent's weights
    filteredDataset.factors.quality_aspects = checkChildren (filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects)
    filteredDataset.factors.product_factors = checkChildren (filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors)
    // filteredDataset.measures = checkChildren (filteredDataset.factors.product_factors, filteredDataset.measures)
    // filteredDataset.diagnostics = checkChildren (filteredDataset.measures, filteredDataset.diagnostics)

    return filteredDataset;
}


