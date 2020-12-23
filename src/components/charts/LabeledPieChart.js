import React from 'react'
import { 
    ResponsiveContainer,
    PieChart, 
    Pie, 
    Cell, 
    Label
} from 'recharts'
import _ from 'lodash'

// const data = [
//     { name: 'HOME-DEV', value: 400 }, 
//     { name: 'HOME-DEV', value: 300 },
//     { name: 'HOME-DEV', value: 300 }, 
//     { name: 'HOME-QA', value: 200 },
//     { name: 'VISITOR-DEV', value: 200 },
//     { name: 'VISITOR-DEV', value: 200 },
//     { name: 'VISITOR-DEV', value: 200 }
// ];
const COLORS = _.shuffle([
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
])

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const customLabel = entry => entry.name
class LabeledPieChart extends React.Component {
    render() {
        let roles = this.props.user.pairing_sessions && this.props.user.pairing_sessions.map(
            (session) => session.users.filter(user => user.username !== this.props.user.username).map((user) => user.role)
        ).flat()
        let stuff = roles && roles.map(role => role.name).reduce(getCount, {})
        let data = stuff ? Object.entries(stuff).map(([key, value]) => ({name: key, value: value})) : []

        const colorFor = (rolename) => { 
            let role = roles.find(u => u.name === rolename)
            return role && role.color
        }

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
                                data.map((entry, index) => <Cell key={index} fill={colorFor(entry.name)} />)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default LabeledPieChart;