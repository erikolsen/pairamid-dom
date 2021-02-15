import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const data = [
    { subject: 'Trust', A: 120, B: 110, fullMark: 150, },
    { subject: 'Humility', A: 98, B: 130, fullMark: 150,},
    { subject: 'Embrace Change', A: 86, B: 130, fullMark: 150,},
    { subject: 'Passion', A: 99, B: 100, fullMark: 150,},
    { subject: 'Attitude', A: 85, B: 90, fullMark: 150, },
    { subject: 'Team Player', A: 65, B: 85, fullMark: 150,},
    { subject: 'Honesty', A: 65, B: 85, fullMark: 150,},
    { subject: 'Leadership', A: 65, B: 85, fullMark: 150,},
    { subject: 'Effectiveness', A: 65, B: 85, fullMark: 150,},
    { subject: 'Job Knowledge', A: 65, B: 85, fullMark: 150,},
    { subject: 'Communication', A: 65, B: 85, fullMark: 150,},
    { subject: 'Quality of Work', A: 65, B: 85, fullMark: 150,},
    { subject: 'Quanity of Work', A: 65, B: 85, fullMark: 150,},
    { subject: 'Company Knowledge', A: 65, B: 85, fullMark: 150,},
    { subject: 'Creativity & Innovation', A: 65, B: 85, fullMark: 150,},
    { subject: 'Organization Management', A: 65, B: 85, fullMark: 150,},
    { subject: 'Glows', A: 65, B: 85, fullMark: 150,},
    { subject: 'Grows', A: 65, B: 85, fullMark: 150,},
  ];


const RadarChartRecharts = () => {
    return (
      <ResponsiveContainer width='100%' height={400}>
        <RadarChart outerRadius={150} data={data}>
            <PolarGrid gridType='circle'/>
            <PolarAngleAxis dataKey="subject" tick={{fontSize: 12}} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="TAGS" dataKey="B" stroke="#0C697A" fill="#0C697A" fillOpacity={0.8} />
        </RadarChart>
      </ResponsiveContainer>
    )
}

export default RadarChartRecharts;
