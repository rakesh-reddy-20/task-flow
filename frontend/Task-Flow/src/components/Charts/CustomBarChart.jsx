import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const getColorByPriority = (priority) => {
  switch (priority) {
    case "Low":
      return "#00BC7D";
    case "Medium":
      return "#FE9900";
    case "High":
      return "#FF1F57";
    default:
      return "#8884d8";
  }
};

const CustomBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-4 text-center">
        No data available to display chart.
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));
  const normalizedData = data.map((d) => ({
    ...d,
    normalizedCount: d.count / maxCount,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <BarChart
          data={normalizedData}
          margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value) => `${Math.round(value * 100)}%`}
          />
          <Bar dataKey="normalizedCount" barSize={80} radius={[10, 10, 0, 0]}>
            {normalizedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColorByPriority(entry.priority)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
