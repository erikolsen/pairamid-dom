import React, { useState, useRef, useEffect } from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
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
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div ref={ref} className="w-full">
      <ResponsiveContainer width="100%" height={width * 0.5}>
        <FunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel reversed={true} dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PyramidChart;
