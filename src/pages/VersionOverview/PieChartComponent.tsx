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
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="Count"
                    cursor="pointer"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div className="text-sm font-medium mt-2">{title}</div>
        </div>
    );
};

export default PieChartComponent; 