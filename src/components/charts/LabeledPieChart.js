import React from 'react'
import { PAIR_FILTER } from '../../constants'
import { 
    ResponsiveContainer,
    PieChart, 
    Pie, 
    Cell, 
} from 'recharts'

const getCount = (acc, el) => {
    acc[el] = (acc[el] + 1) || 1;
    return acc
};

const customLabel = entry => entry.name
class LabeledPieChart extends React.Component {
    render() {
        let roles = this.props.user.pairing_sessions && this.props.user.pairing_sessions.filter(PAIR_FILTER).map(
            (session) => session.users.filter(user => user.username !== this.props.user.username).map((user) => user.role)
        ).flat()
        let roleCounts = roles && roles.map(role => role.name).reduce(getCount, {})
        let data = roleCounts ? Object.entries(roleCounts).map(([key, value]) => ({name: key, value: value})) : []

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