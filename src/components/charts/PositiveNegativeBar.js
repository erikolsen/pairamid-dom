import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis
} from "recharts";

// const data = [
//   {
//     name: "Communication",
//     glow: 4000,
//     grow: -2400,
//   },
//   {
//     name: "Feedback",
//     glow: -3000,
//     grow: 1398,
//   },
//   {
//     name: "Team Player",
//     glow: -2000,
//     grow: -9800,
//   },
//   {
//     name: "Leadership",
//     glow: 2780,
//     grow: 3908,
//   },
//   {
//     name: "Trust",
//     glow: -1890,
//     grow: 4800,
//   },
//   {
//     name: "Quality of Work",
//     glow: 2390,
//     grow: -3800,
//   },
//   {
//     name: "Attitude",
//     glow: 3490,
//     grow: 4300,
//   }
// ];

// const PositiveNegativeBar = ({data}) => {
//     console.log('data: ', data)
//     return (
//         <ResponsiveContainer width='100%' height={600}>
//             <BarChart
//                 layout='vertical'
//                 data={data}
//                 margin={{
//                     top: 5,
//                     right: 10,
//                     left: 100,
//                     bottom: 5
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number"/>
//                 <YAxis type="category" dataKey="name" />
//                 <Tooltip />
//                 <Legend />
//                 <ReferenceLine x={0} stroke="#000" />
//                 <Bar dataKey="glow" fill="#EDAB3B" />
//                 <Bar dataKey="grow" fill="#00BB85" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }
const PositiveNegativeBar = ({data}) => {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <BarChart
                layout='vertical'
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 100,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="glow" fill="#EDAB3B" stackId='a' />
                <Bar dataKey="grow" fill="#00BB85" stackId='a' />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PositiveNegativeBar
