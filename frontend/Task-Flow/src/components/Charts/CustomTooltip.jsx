import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0];
    const { payload: data } = item;

    const labelTitle = data.priority
      ? "Priority"
      : data.status
      ? "Status"
      : "Label";

    const labelValue = data.priority || data.status || "N/A";
    const countValue = data.count ?? "—";

    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-md px-4 py-2 text-sm text-gray-800">
        <p className="mb-1">
          <span className="font-semibold text-gray-600">{labelTitle}:</span>{" "}
          <span className="text-gray-900">{labelValue}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Tasks:</span>{" "}
          <span className="text-gray-900">{countValue}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
