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

const PositiveNegativeBar = ({data}) => {
    const minRowHeight = 200
    const pixelHeightBase = 50
    const pixelLengthBase = 7
    const longestLabel = Math.max(...data.map(d => d.name.length)) 
    const rows = data.length || 1
    const nonBreakingWhiteSpace = val => val && val.replace(/ /g, '\u00a0')
    const containerHight = Math.max(...[minRowHeight, rows*pixelHeightBase])

    return (
        <ResponsiveContainer width='100%' height={containerHight}>
            <BarChart
                layout='vertical'
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: pixelLengthBase * longestLabel,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" tickFormatter={nonBreakingWhiteSpace} />
                <Tooltip />
                <Legend />
                <Bar dataKey="glow" fill="#EDAB3B" stackId='a' />
                <Bar dataKey="grow" fill="#00BB85" stackId='a' />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default PositiveNegativeBar
