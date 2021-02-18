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

const data = [
    { name: 'Communication', date: '02/01/2021', z: 20 }, 
    { name: 'Glow', date: '02/01/2021', z: 90 }, 
    { name: 'Grow', date: '02/02/2021', z: 160 },
    { name: 'Team Player', date: '02/02/2021', z: 400 }, 
    { name: 'Attitude', date: '02/03/2021', z: 280 },
    { name: 'Trust', date: '02/03/2021', z: 500 }, 
    { name: 'Leadership', date: '02/03/2021', z: 200 },
]

const SimpleScatterChart = () => {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <ScatterChart margin={{ top: 20, right: 100, bottom: 20, left: 100 }}>
                <CartesianGrid />
                <YAxis dataKey='name' type='category' name='tag' />
                <XAxis dataKey='date' type='category' name='date' />
                <ZAxis dataKey='z' range={[20, 500]} name='quantity' />
                <Scatter name='Feedback Tags' data={data} fill='#8884d8' />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default SimpleScatterChart