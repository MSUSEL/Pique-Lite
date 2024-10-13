import { atom, useAtomValue, useAtom } from "jotai";
import { State } from "../state/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { flatCharacteristicDataAtom, flatProjectsDataAtom } from "../state";

const CHARACTERISTIC_NAMES = [
  "Availability",
  "Authenticity",
  "Authorization",
  "Confidentiality",
  "Non-repudiation",
  "Integrity",
];

const PROJECT_NAMES = [
  'project_1',
]

const CHARACTERISTIC_COLORS = [
  "#4CAF50", // green for Availability
  "#FF9800", // orange for Authenticity
  "#2196F3", // blue for Authorization
  "#9C27B0", // purple for Confidentiality
  "#F7DC6F", // golden yellow for Non-repudiation
  "#8BC34A", // teal for Integrity
];

export const LinePlot = () => {
  const flatData = useAtomValue(flatCharacteristicDataAtom);

  return (
    <ResponsiveContainer height={350}>
      <LineChart
        data={flatData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '70px' }} />
        {CHARACTERISTIC_NAMES.map((characteristic, index) => (
          <Line
            key={characteristic}
            type="monotone"
            dataKey={characteristic}
            name={characteristic}
            stroke={CHARACTERISTIC_COLORS[index % CHARACTERISTIC_COLORS.length]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export const LinePlot_Compare = () => {

  const projects = useAtomValue(flatProjectsDataAtom);  

  return (
    <ResponsiveContainer width={800} height={300}>
      <LineChart
        data={projects}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {PROJECT_NAMES.map((characteristic, index) => (
          <Line
            key={characteristic}
            type="monotone"
            dataKey={characteristic}
            name={characteristic}
            stroke={CHARACTERISTIC_COLORS[index % CHARACTERISTIC_COLORS.length]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
