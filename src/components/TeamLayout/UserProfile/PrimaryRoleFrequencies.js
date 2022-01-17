import React, { useContext } from "react";
import PyramidChart from "../../charts/PyramidChart";
import { TeamContext } from "../TeamContext";
import {
  mostPairedWithRole,
  roleMapping,
} from "../TeamToday/PairGrid/Pair/recommendationHelper";

const RED = "#ED643B";
const YELLOW = "#EDAA3B";
const GREEN = "#00BB85";
const GRAY = "#C7C7C7";

export const frequencyColor = (target, value, relevantUsers, solo) => {
  const total = relevantUsers.reduce(
    (memo, user) => (memo += target.frequencies[user] || 0),
    0
  );
  const average = total / relevantUsers.length || 1;
  if (solo) return GRAY;
  if (!value || value < average / 2) return YELLOW;
  if (value > 1 && value > average * 2) return RED;
  return GREEN;
};

const PrimaryRoleFrequencies = ({ user }) => {
  const {
    frequency,
    team: { users },
  } = useContext(TeamContext);

  const myFreq = frequency.find((u) => u.username === user.username);
  const roleFreq = roleMapping(frequency);

  const primaryRole = mostPairedWithRole(myFreq, roleFreq);
  const relUsers = users
    .filter((u) => u.username !== user.username)
    .filter((u) => u.role.name === primaryRole);

  const keyUsers = relUsers
    .reduce(
      (acc, user) => [
        ...acc,
        {
          username: user.username,
          count: myFreq.frequencies[user.username],
          roleColor: user.role.color,
        },
      ],
      []
    )
    .sort((a, b) => a.count - b.count);

  const data = keyUsers.map((u, index) => ({
    value: index + 1,
    name: u.username,
    roleColor: u.roleColor,
    count: myFreq.frequencies[u.username],
    fill: frequencyColor(
      myFreq,
      myFreq.frequencies[u.username],
      relUsers.map((u) => u.username)
    ),
  }));

  const recommendedList = data.slice(0, 3);
  const options = {
    position: "insideBottom",
    fill: "#fff",
  };

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="mt-4 text-center">Primary Role Frequencies</h2>
        <PyramidChart data={data.reverse()} labelOptions={options} />
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <p className="mt-4 text-center font-bold">Pair Recommendations</p>
        <div className="flex justify-center p-2">
          {recommendedList.map((user) => (
            <div
              className="rounded-md mx-2"
              key={user.name}
              style={{ backgroundColor: user.fill }}
            >
              <div
                style={{ backgroundColor: user.roleColor }}
                className={`bg-gray-med w-12 h-12 m-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryRoleFrequencies;
