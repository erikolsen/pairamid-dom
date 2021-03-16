import React from 'react'
import { 
    RadialBarChart,
    PolarAngleAxis,
    RadialBar,
    Cell, 
    Tooltip,
} from 'recharts'

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

export default SimpleRadialBarChart
