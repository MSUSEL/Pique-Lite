import * as schema from "../../state/visualizerSchema";

interface SortableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

interface NestedObject {
    [key: string]: SortableItem;
}


// for sorting by value
function sortObjectsByValue(obj: Record<string, SortableItem>, ascending: boolean = true): Record<string, SortableItem> {
    return Object.entries(obj)
        .sort(([, a], [, b]) => ascending ? a.value - b.value : b.value - a.value)
        .reduce<Record<string, SortableItem>>((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}


// v2
function sortWeights(weights: Record<string, number>, ascending: boolean): Record<string, number> {
    return Object.entries(weights)
        .sort(([, a], [, b]) => ascending ? a - b : b - a)
        .reduce<Record<string, number>>((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}

function sortObjectsByWeights(referObj: NestedObject, sortObj: NestedObject, ascending: boolean = true): NestedObject {
    // Step 1: Sort referObj weights and create an ordered dictionary
    let orderDict: Record<string, number> = {};
    for (const key in referObj) {
        referObj[key].weights = sortWeights(referObj[key].weights, ascending);
        Object.keys(referObj[key].weights).forEach((weightKey, index) => {
            orderDict[weightKey] = index;
        });
    }

    // Step 2: Sort sortObj based on the orderDict
    let sortedObj: NestedObject = JSON.parse(JSON.stringify(sortObj));
    sortedObj = Object.entries(sortedObj)
        .sort(([keyA, a], [keyB, b]) => {
            return orderDict[a.name] - orderDict[b.name];
        })
        .reduce<NestedObject>((acc, [key, val]) => ({ ...acc, [key]: val }), {});

    return sortedObj;
}

export function sort(sortState: string, dataset: schema.base.Schema): schema.base.Schema | undefined {
    
    // const dataset = useAtomValue(State.dataset);
    // const sortState = useAtomValue(State.sortingState);
    if (!dataset) return undefined;

    // Clone the dataset
    var sortedDataset = JSON.parse(JSON.stringify(dataset));

    switch (sortState) {
        case 'value-asc':
            // sorting by value in ascending order
            sortedDataset.factors.product_factors = sortObjectsByValue(sortedDataset.factors.product_factors, true);
            sortedDataset.factors.quality_aspects = sortObjectsByValue(sortedDataset.factors.quality_aspects, true);
            sortedDataset.factors.tqi = sortObjectsByValue(sortedDataset.factors.tqi, true);
            sortedDataset.measures = sortObjectsByValue(sortedDataset.measures, true);
            sortedDataset.diagnostics = sortObjectsByValue(sortedDataset.diagnostics, true);
            break;
        case 'value-desc':
            // sorting by value in descending order
            sortedDataset.factors.product_factors = sortObjectsByValue(sortedDataset.factors.product_factors, false);
            sortedDataset.factors.quality_aspects = sortObjectsByValue(sortedDataset.factors.quality_aspects, false);
            sortedDataset.factors.tqi = sortObjectsByValue(sortedDataset.factors.tqi, false);
            sortedDataset.measures = sortObjectsByValue(sortedDataset.measures, false);
            sortedDataset.diagnostics = sortObjectsByValue(sortedDataset.diagnostics, false);

            break;
        case 'weight-asc':
            // sorting by weight in ascending order
            sortedDataset.factors.quality_aspects = sortObjectsByWeights(sortedDataset.factors.tqi, sortedDataset.factors.quality_aspects, true);
            sortedDataset.factors.product_factors = sortObjectsByWeights(sortedDataset.factors.quality_aspects, sortedDataset.factors.product_factors, true);
            sortedDataset.measures = sortObjectsByWeights(sortedDataset.factors.product_factors, sortedDataset.measures, true);
            sortedDataset.diagnostics = sortObjectsByWeights(sortedDataset.measures, sortedDataset.diagnostics, true);
            break;

        case 'weight-desc':
            // sorting by weight in descending order
            sortedDataset.factors.quality_aspects = sortObjectsByWeights(sortedDataset.factors.tqi, sortedDataset.factors.quality_aspects, false);
            sortedDataset.factors.product_factors = sortObjectsByWeights(sortedDataset.factors.quality_aspects, sortedDataset.factors.product_factors, false);
            sortedDataset.measures = sortObjectsByWeights(sortedDataset.factors.product_factors, sortedDataset.measures, false);
            sortedDataset.diagnostics = sortObjectsByWeights(sortedDataset.measures, sortedDataset.diagnostics, false);
            break;

        default:
            // No sorting or unrecognized sort state
            return dataset;
    }


    return sortedDataset;
}
