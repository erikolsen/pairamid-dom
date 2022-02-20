import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const getCount = (acc, el) => {
  acc[el] = acc[el] + 1 || 1;
  return acc;
};

const customLabel = (entry) => entry.name;

const LabeledPieChart = ({ user: { activePairingSessions, username } }) => {
  const roles = activePairingSessions
    .map((session) =>
      session.teamMembers
        .filter((user) => user.username !== username)
        .map((user) => user.role)
    )
    .flat();

  const roleCounts = roles?.map((role) => role.name).reduce(getCount, {});

  const data = roleCounts
    ? Object.entries(roleCounts).map(([key, value]) => ({
        name: key,
        value: value,
      }))
    : [];

  const colorFor = (rolename) => {
    let role = roles.find((u) => u.name === rolename);
    return role && role.color;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            label={customLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colorFor(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LabeledPieChart;
