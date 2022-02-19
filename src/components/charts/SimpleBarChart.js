import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const getCount = (acc, el) => {
  acc[el] = acc[el] + 1 || 1;
  return acc;
};

class SimpleBarChart extends React.Component {
  render() {
    let team_members =
      this.props.user.active_pairing_sessions &&
      this.props.user.active_pairing_sessions
        .map((session) =>
          session.team_members.filter(
            (u) => u.username !== this.props.user.username
          )
        )
        .flat();
    let userCounts =
      team_members && team_members.map((u) => u.username).reduce(getCount, {});
    let data = userCounts
      ? Object.entries(userCounts)
          .map(([key, value]) => ({ name: key, username: value }))
          .sort((a, b) => a.username - b.username)
      : [];

    const colorFor = (username) => {
      let team_member = team_members.find((u) => u.username === username);
      return team_member && team_member.role.color;
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="username">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorFor(entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleBarChart;
