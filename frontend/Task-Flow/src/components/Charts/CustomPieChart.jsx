import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

const CustomPieChart = ({ data, colors }) => {
  if (!data || data.length === 0 || data.every((item) => item.count === 0)) {
    return (
      <div className="text-sm text-gray-500 py-4 text-center">
        No data available to display chart.
      </div>
    );
  }

  const totalCount = data.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={70}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Center Label */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[13px] fill-gray-700"
          >
            {totalCount} Tasks
          </text>

          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
