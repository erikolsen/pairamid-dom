import React from 'react'
import { 
    ResponsiveContainer,
    PieChart, 
    Pie, 
    Cell, 
    Label
} from 'recharts'

const data = [
    { name: 'HOME-DEV', value: 400 }, 
    { name: 'HOME-DEV', value: 300 },
    { name: 'HOME-DEV', value: 300 }, 
    { name: 'HOME-QA', value: 200 },
    { name: 'VISITOR-DEV', value: 200 },
    { name: 'VISITOR-DEV', value: 200 },
    { name: 'VISITOR-DEV', value: 200 }
];
const COLORS = [
    '#7400b8ff',
    '#6930c3ff',
    '#5e60ceff',
    '#5390d9ff',
    '#4ea8deff',
    '#48bfe3ff',
    '#56cfe1ff',
    '#64dfdfff',
    '#72efddff',
    '#80ffdbff'
]

const customLabel = entry => entry.name
class LabeledPieChart extends React.Component {
    render() {
        console.log('Props', this.props)
        let stuff = this.props.pairing_sessions && this.props.user.pairing_sessions.map(
            (session) => session.uuid
        )
        console.log('stuff', stuff)
        return (
            <div>
                <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                        <Pie
                            dataKey='value'
                            data={data}
                            label={customLabel}
                            outerRadius={80}
                            fill="#8884d8"
                        >
                            {
                                data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default LabeledPieChart;