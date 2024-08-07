import { title, data } from '../dashboard-data-files/SampleData';

export const width = '10px';
export const height = '400px';
export const chartType = "Table";
export const showButton = true;
export const inputData = data;

export const options = {
  title: title,
  curveType: "function",
  legend: { position: "bottom" },
  allowHtml: true,
  width: '200%', 
  height: '90%',
};