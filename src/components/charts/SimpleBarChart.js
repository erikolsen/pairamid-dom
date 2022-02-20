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

const SimpleBarChart = ({ teamMember }) => {
  const teamMembers = teamMember?.activePairingSessions
    .map((session) =>
      session.teamMembers.filter((u) => u.username !== teamMember.username)
    )
    .flat();
  const userCounts = teamMembers?.map((u) => u.username).reduce(getCount, {});
  const data = userCounts
    ? Object.entries(userCounts)
        .map(([key, value]) => ({ name: key, username: value }))
        .sort((a, b) => a.username - b.username)
    : [];

  const colorFor = (username) => {
    const teamMember = teamMembers.find((u) => u.username === username);
    return teamMember && teamMember.role.color;
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
};

export default SimpleBarChart;
