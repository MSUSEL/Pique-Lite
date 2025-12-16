import * as schema from "../../state/visualizerSchema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

function calculateFilterRanges(checkboxStates: Record<string, boolean>): [number, number][] {
    const ranges: Record<string, [number, number]> = {
        Insignificant: [0.8, 1],
        Low: [0.6, 0.8],
        Medium: [0.4, 0.6],
        High: [0.2, 0.4],
        Severe: [-10, 0.2]
    };
    const needToFilterRange = Object.entries(checkboxStates)
        .filter(([key, value]) => !value && ranges.hasOwnProperty(key))
        .map(([key, _]) => ranges[key]);

    // console.log(needToFilterRange)

    return needToFilterRange
}


function filterByValueForRiskLevel(obj: Record<string, FilterableItem>, ranges: [number, number][]): Record<string, FilterableItem> {
    
    const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, item]) => {
        return !ranges.some(range => item.value >= range[0] && item.value <= range[1]);
    }));

    return filteredObj;
}

function filterWeightsByWeightKeys(obj: Record<string, FilterableItem>, dictionary: string[]): Record<string, FilterableItem> {
   
    const filteredObj = Object.fromEntries(
        Object.entries(obj).map(([key, item]) => [
            key,
            { ...item, weights: Object.fromEntries(Object.entries(item.weights).filter(([k, _]) => dictionary.includes(k))) }
        ])
    );
    
    return filteredObj;
}

// by risk levels
function filterObjectsByRiskLevels(
    filterWeightsObj: Record<string, FilterableItem>,
    filterValueObj: Record<string, FilterableItem>,
    checkboxStates: Record<string, boolean> // Changed type
): [Record<string, FilterableItem>, Record<string, FilterableItem>] {
    // Define the filter range based on checkboxStates
    const filterRange = calculateFilterRanges(checkboxStates);

    // Filter filterValueObj
    const filteredByValueObj = filterByValueForRiskLevel(filterValueObj, filterRange);

    // Get the dictionary of names from filteredByValueObj
    const dictionary = Object.keys(filteredByValueObj);

    // Filter filterWeightsObj
    const filteredByWeightsObj = filterWeightsByWeightKeys(filterWeightsObj, dictionary);

    return [filteredByWeightsObj, filteredByValueObj];
}



// exported functions: 
export function filterByRiskLevels(
    dataset: schema.base.Schema | undefined,
    checkboxStates: Record<string, boolean>
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    // Apply filtering based on risk level
    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByRiskLevels(filteredDataset.factors.product_factors, filteredDataset.measures, checkboxStates);
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByRiskLevels(filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors, checkboxStates);
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByRiskLevels(filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects, checkboxStates);
    
    return filteredDataset;
}
