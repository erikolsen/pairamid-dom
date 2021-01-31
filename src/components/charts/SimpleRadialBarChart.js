import React from 'react'
import { 
    RadialBarChart,
    PolarAngleAxis,
    RadialBar,
    Cell, 
    Tooltip,
} from 'recharts'

// const style = {
// 	top: 0,
// 	left: 350,
// 	lineHeight: '24px',
// };
// <Legend 
//     iconSize={20} 
//     width={120} 
//     height={140} 
//     layout='vertical' 
//     verticalAlign='middle' 
//     wrapperStyle={style} 
// /> 

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload) {
		return (
            <p>{payload[0].payload.name} - {payload[0].value}%</p>
		);
	}

	return null;
};

const SimpleRadialBarChart = ({data}) => {

    return (
        <div className='flex justify-center'>
            <RadialBarChart 
                width={500} 
                height={300} 
                innerRadius={20} 
                outerRadius={140} 
                data={data}
                startAngle={150}
                endAngle={-210}
            >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar 
                    minAngle={15} 
                    background
                    clockWise={true} 
                    dataKey='percent' 
                >
                    {
                        data.map((entry, index) => {
                            return <Cell key={index} fill={entry.color} />;
                        })
                    }
                </RadialBar >
                <Tooltip content={<CustomTooltip />} />
            </RadialBarChart>
        </div>
    );
}

// const RadialChart = () => {
//     const data = [
//         { id: "1", name: "L1", value: 50 },
//         { id: "2", name: "L2", value: 50 }
//         ];
//     return (
//         <ResponsiveContainer width='100%' height={200} className=''>
//             <PieChart >
//                 <text
//                     x={'50%'}
//                     y={100}
//                     textAnchor="middle"
//                     dominantBaseline="middle"
//                     className='text-3xl md:text-5xl'
//                 >
//                     50%
//                 </text>
//                 <Pie
//                     data={data}
//                     dataKey="value"
//                     innerRadius="80%"
//                     outerRadius="100%"
//                     fill="#82ca9d"
//                     startAngle={90}
//                     endAngle={-270}
//                     paddingAngle={0}
//                     blendStroke
//                 >
//                     <Cell
//                         key="test"
//                         fill="#CCC"
//                     />
//                     <Label value="Pages of my website" offset={100} position="bottom" />
//                 </Pie>
//             </PieChart>
//         </ResponsiveContainer>
//     )
// }

export default SimpleRadialBarChart
