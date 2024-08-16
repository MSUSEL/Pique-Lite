import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EditorButton from '../components/editorButtion/EditorButton.component';

const PiqueChart = ({ data, width, height, options, showButton }) => {
    const [chartData, setChartData] = React.useState(data);

    const handleEditData = () => {
        // Logic for editing chart data can be implemented here
        console.log('Edit Data button clicked');
    };

    return (
        <div>
            {showButton && (
                <EditorButton onClick={handleEditData}>
                    Edit Data
                </EditorButton>
            )}
            <ResponsiveContainer width={width} height={height}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={options.xAxisKey || 'name'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={options.yAxisKey || 'value'} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PiqueChart;
