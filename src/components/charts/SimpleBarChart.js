import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { PAIR_FILTER } from '../../constants'

const getCount = (acc, el) => {
  acc[el] = (acc[el] + 1) || 1;
  return acc
};

class SimpleBarChart extends React.Component {
  render() {
    let users = this.props.user.active_pairing_sessions && this.props.user.active_pairing_sessions.filter(PAIR_FILTER).map(
      (session) => session.users.filter(u=> u.username !== this.props.user.username)
    ).flat()
    let userCounts = users && users.map(u => u.username).reduce(getCount, {})
    let data = userCounts ? Object.entries(userCounts).map(([key, value]) => ({ name: key, username: value })).sort((a, b) => a.username - b.username) : []

    const colorFor = (username) => { 
        let user = users.find(u => u.username === username)
        return user && user.role.color
    }

    return (
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="username">
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorFor(entry.name)} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleBarChart;
