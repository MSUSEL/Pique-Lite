import { title, data } from '../../dashboard-data-files/CalenderData';
export const width = '1000px';
export const height = '180px';
export const chartType = 'Calendar';
export const showButton = false;

export const inputData = data;

export const options = {
    title: title,
    calendar: {
        cellColor: {
          stroke: 'grey',      // Color the border of the squares.
          strokeOpacity: 0.5, // Make the borders half transparent.
          strokeWidth: 2      // ...and two pixels thick.

        },
        cellSize: '15',
        dayOfWeekLabel: {
            fontName: 'Times-Roman',
            fontSize: 12,
            color: 'black',
            bold: false,
            italic: true
        },
        focusedCellColor: {
            stroke: 'red',
            strokeOpacity: 0.8,
            strokeWidth: 3
          },
          monthOutlineColor: {
            stroke: '#226192',
            strokeOpacity: 0.8,
            strokeWidth: 2
          },
          underYearSpace: 10, // Bottom padding for the year labels.
          yearLabel: {
            fontName: 'Times-Roman',
            fontSize: 32,
            color: '#132D72',
            bold: true,
            italic: true
          }
      },
    colorAxis: {colors:['#ff6150','#38b24d']}
}
