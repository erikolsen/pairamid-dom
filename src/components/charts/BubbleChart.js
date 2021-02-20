import React from 'react';
import {
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    ZAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns'

const oldData = [
    { name: 'Communication', date: '02/01/2021', z: 20 }, 
    { name: 'Glow', date: '02/01/2021', z: 90 }, 
    { name: 'Attitude', date: '02/01/2021', z: 280 },
    { name: 'Grow', date: '02/02/2021', z: 160 },
    { name: 'Team Player', date: '02/02/2021', z: 400 }, 
    { name: 'Glow', date: '02/03/2021', z: 280 },
    { name: 'Trust', date: '02/03/2021', z: 500 }, 
    { name: 'Leadership', date: '02/03/2021', z: 200 },
]
// const data = [
//     { name: 'Communication', date: 2, z: 20 }, 
//     { name: 'Glow', date: 2, z: 90 }, 
//     { name: 'Grow', date: 3, z: 160 },
//     { name: 'Team Player', date: 5, z: 400 }, 
//     { name: 'Attitude', date: 6, z: 280 },
//     { name: 'Trust', date: 7, z: 500 }, 
//     { name: 'Leadership', date: 7, z: 200 },
// ]
const formatXAxis = (tickItem) => {
    return format(new Date(tickItem), 'MM/dd/yyyy')
  }

const dateToInt = (date) => {
    return new Date(date).getTime()
}

const SimpleScatterChart = () => {
    const data = oldData.map(d => ({...d, date: dateToInt(d.date)}))

    return (
        <ResponsiveContainer width='100%' height={400}>
            <ScatterChart margin={{ top: 20, right: 100, bottom: 20, left: 100 }}>
                <CartesianGrid />
                <XAxis padding={{left: 20, right: 20}} domain={['auto','auto']} dataKey='date' type='number' name='date' scale='time' tickFormatter={formatXAxis} />
                <YAxis allowDuplicatedCategory={false} dataKey='name' type='category' name='name' />
                <ZAxis dataKey='z' range={[20, 500]} name='quantity' />
                <Scatter name='Feedback Tags' data={data} fill='#8884d8' />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default SimpleScatterChart