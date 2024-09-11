import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const xAxisValues = ["Availability","Authenticity","Authorization","Confidentiality","Non-repudiation","Integrity"];

const PiqueChart = ({ projects, options }) => {
  const [chartType, setChartType] = useState('line'); // Toggle between line and radar charts

  // Function to merge and synchronize data
  const mergeData = () => {
    const mergedData = xAxisValues.map((name) => {
      const mergedItem = { [options.xAxisKey || 'name']: name };

      projects.forEach((project, index) => {
        const projectData = project.data.find((item) => item[options.xAxisKey || 'name'] === name);
        mergedItem[`Project${index + 1}`] = projectData ? projectData[options.yAxisKey || 'value'] : 0;
      });

      return mergedItem;
    });

    return mergedData;
  };

  const mergedData = mergeData(); // Synchronize the data

  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'radar' : 'line');
  };

  return (
    <div>
      <button onClick={toggleChartType}>
        Toggle to {chartType === 'line' ? 'RadarChart' : 'LineChart'}
      </button>
      <ResponsiveContainer width={1200} height={500}>
        {chartType === 'line' ? (
          <LineChart data={mergedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={options.xAxisKey || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Render one Line per project with synchronized data */}
            {projects.map((project, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`Project${index + 1}`}  // Use the dynamically created project key
                name={`Project ${index + 1}`}
                stroke={project.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </LineChart>
        ) : (
          <RadarChart data={mergedData} outerRadius={150}>
            <PolarGrid />
            <PolarAngleAxis dataKey={options.xAxisKey || 'name'} />
            <PolarRadiusAxis />
            {projects.map((project, index) => (
              <Radar
                key={index}
                name={`Project ${index + 1}`}
                dataKey={`Project${index + 1}`}  // Use the dynamically created project key
                stroke={project.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
                fill={project.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`}
                fillOpacity={0.6}
              />
            ))}
            <Tooltip />
          </RadarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PiqueChart;
