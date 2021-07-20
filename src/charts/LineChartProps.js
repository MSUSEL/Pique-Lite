import {title, data} from '../dashboard-data-files/BinData';

export const width = '600px';
export const height= '400px'
export const chartType = 'LineChart'
export const showButton = true;
export const inputData = data;

export const options = {
    title: title,
    hAxis: { title: 'BusyBox Version', minValue: 0, maxValue: 1 },
    vAxis: { title: 'Pique Bin Security Score', minValue: 0, maxValue: 1 },
    legend: 'none',
    colors:['#226192','#004411'],
    backgroundColor: 'white'
}