export const width = '600px';

export const height= '300px'


export const chartType = 'LineChart'

export const showButton = true;

export const data = [
  ['Version', 'Score'],
  ['1.21.1', 0.4926172],
  ['1.28.4', 0.5188571],
  ['1.29.0', 0.5411642],
  ['1.29.1', 0.5411642],
  ['1.29.2', 0.5411151],
  ['1.29.3', 0.5411151],
  ['1.30.0', 0.5446692],
  ['1.30.1', 0.5631526],
  
]

export const options = {
  title: 'Busybox Versions vs.Pique Bin Security Score',
  hAxis: { title: 'BusyBox Version', minValue: 0, maxValue: 1 },
  vAxis: { title: 'Pique Bin Security Score', minValue: 0, maxValue: 1 },
  legend: 'none',
  colors:['#226192','#004411'],
  backgroundColor: 'white'
}
