import React from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';


const RadarChartRecharts = ({ data, maxSize }) => {
  if(data.length === 0) return null
  return (
    <ResponsiveContainer width='100%' height={400}>
      <RadarChart outerRadius={150} data={data}>
        <PolarGrid gridType='circle' />
        <PolarAngleAxis dataKey="tag" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, maxSize]} />
        <Radar name="TAGS" dataKey="tagCount" stroke="#0C697A" fill="#0C697A" fillOpacity={0.8} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarChartRecharts;
