import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { usePieChartColors } from "./PieChartColor";

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
    const colors = usePieChartColors();

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <PieChart width={180} height={180} className="mx-auto">
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="Count"
                    cursor="pointer"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div className="text-sm font-medium mt-1">{title}</div>
        </div>
    );
};

export default PieChartComponent; 