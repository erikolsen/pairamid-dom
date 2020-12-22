import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend 
} from 'recharts';

const data = [
      {name: 'EO', user: 4000, pv: 2400, amt: 2400},
      {name: 'MR', user: 3000, pv: 1398, amt: 2210},
      {name: 'CD', user: 2000, pv: 9800, amt: 2290},
      {name: 'KD', user: 2780, pv: 3908, amt: 2000},
      {name: 'MS', user: 1890, pv: 4800, amt: 2181},
      {name: 'RP', user: 2390, pv: 3800, amt: 2500},
      {name: 'JL', user: 3490, pv: 4300, amt: 2100},
];

class SimpleBarChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="user" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleBarChart;
