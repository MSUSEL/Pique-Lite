import * as schema from "../../state/visualizerSchema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}



function filterByValue(obj: Record<string, FilterableItem>, range: [number, number]): Record<string, FilterableItem> {
    const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, item]) => {
        return item.value >= range[0] && item.value <= range[1];
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



// by value range: for quality aspect, product factor, measures
function filterObjectsByValueRange(
    filterWeightsObj: Record<string, FilterableItem>,
    filterValueObj: Record<string, FilterableItem>,
    minValue: number,
    maxValue: number
): [Record<string, FilterableItem>, Record<string, FilterableItem>] {
    // Define the filter range
    const filterRange: [number, number] = [minValue, maxValue];

    // Filter filterValueObj
    const filteredByValueObj = filterByValue(filterValueObj, filterRange);

    // Get the dictionary of names from filteredByValueObj
    const dictionary = Object.keys(filteredByValueObj);

    // Filter filterWeightsObj
    const filteredByWeightsObj = filterWeightsByWeightKeys(filterWeightsObj, dictionary);

    return [filteredByWeightsObj, filteredByValueObj];
}


function filterObjectsByValueRangeForTQI(
    filterValueObj: Record<string, FilterableItem>,
    minValue: number,
    maxValue: number
): Record<string, FilterableItem> {
    // Define the filter range
    const filterRange: [number, number] = [minValue, maxValue];

    // Filter filterValueObj
    const filteredByValueObj = filterByValue(filterValueObj, filterRange);

    return filteredByValueObj;
}




export function filterByValueRange(
    dataset: schema.base.Schema | undefined,
    minValue: number,
    maxValue: number
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByValueRange(
        filteredDataset.factors.product_factors,
        filteredDataset.measures,
        minValue,
        maxValue
    );
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByValueRange(
        filteredDataset.factors.quality_aspects,
        filteredDataset.factors.product_factors,
        minValue,
        maxValue
    );
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByValueRange(
        filteredDataset.factors.tqi,
        filteredDataset.factors.quality_aspects,
        minValue,
        maxValue
    );
    filteredDataset.factors.tqi = filterObjectsByValueRangeForTQI(
        filteredDataset.factors.tqi,
        minValue,
        maxValue
    );

    return filteredDataset;
}



