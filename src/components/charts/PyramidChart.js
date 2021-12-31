import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload) {
    return null;
  }
  return (
    <div className="bg-white border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg z-50">
      <p>
        {payload[0].payload.name} - {payload[0].payload.count}
      </p>
    </div>
  );
};

const PyramidChart = ({ data }) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <FunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel reversed={true} dataKey="value" data={data} isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={entry.color} fontSize={10} />
            ))}
            <LabelList
              position="inside"
              fill="#FFF"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PyramidChart;
