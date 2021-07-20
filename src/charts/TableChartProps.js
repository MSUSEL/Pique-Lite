import { title, data } from '../dashboard-data-files/CerlData';

export const width = '600px';
export const height = '400px';
export const chartType = "Table";
export const showButton = true;
export const inputData = data;

export const options = {
  title: title,
  curveType: "function",
  legend: { position: "bottom" },
  allowHtml: true,
  width: '100%', 
  height: '90%',
};