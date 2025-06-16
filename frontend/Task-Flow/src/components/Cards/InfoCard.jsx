import React from "react";

export const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
      {/* Color dot */}
      <div className={`w-3 h-3 rounded-full ${color}`} />

      {/* Text content */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
