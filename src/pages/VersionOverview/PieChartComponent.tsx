import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { COLORS } from "./PieChartColor";

interface ChartDataItem {
    name: string;
    Count: number;
}

interface PieChartComponentProps {
    title: string;
    data: ChartDataItem[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
    title,
    data
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm font-medium mb-2">{title}</div>
            <PieChart width={100} height={100}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    fill="#8884d8"
                    dataKey="Count"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default PieChartComponent; 