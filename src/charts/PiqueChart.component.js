import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const PiqueChart = ({ data, width, height, options }) => {
    const [chartType, setChartType] = useState('line'); // State to toggle between 'line' and 'radar'

    const toggleChartType = () => {
        setChartType(chartType === 'line' ? 'radar' : 'line');
    };

    return (
        <div>
            <button onClick={toggleChartType}>
                Toggle to {chartType === 'line' ? 'RadarChart' : 'LineChart'}
            </button>
            <ResponsiveContainer width={600} height={600}>
                {chartType === 'line' ? (
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={options.xAxisKey || 'name'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={options.yAxisKey || 'value'} stroke="#8884d8" />
                    </LineChart>
                ) : (
                    <RadarChart data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey={options.xAxisKey || 'name'} />
                        <PolarRadiusAxis />
                        <Radar name="Score" dataKey={options.yAxisKey || 'value'} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default PiqueChart;
