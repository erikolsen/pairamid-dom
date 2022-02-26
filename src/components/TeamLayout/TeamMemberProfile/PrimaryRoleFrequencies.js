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
    (memo, teamMember) => (memo += target.frequencies[teamMember] || 0),
    0
  );
  const average = total / relevantUsers.length || 1;
  if (solo) return GRAY;
  if (!value || value < average / 2) return YELLOW;
  if (value > 1 && value > average * 2) return RED;
  return GREEN;
};

const PrimaryRoleFrequencies = ({ teamMember }) => {
  const {
    frequency,
    team: { teamMembers },
  } = useContext(TeamContext);

  const myFreq = frequency.find((u) => u.username === teamMember.username);
  const roleFreq = roleMapping(frequency);

  const primaryRole = mostPairedWithRole(myFreq, roleFreq);
  const relUsers = teamMembers
    .filter((u) => u.username !== teamMember.username)
    .filter((u) => u.role.name === primaryRole);

  const keyUsers = relUsers
    .reduce(
      (acc, teamMember) => [
        ...acc,
        {
          username: teamMember.username,
          count: myFreq.frequencies[teamMember.username],
          roleColor: teamMember.role.color,
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
          {recommendedList.map((teamMember) => (
            <div
              className="rounded-md mx-2"
              key={teamMember.name}
              style={{ backgroundColor: teamMember.fill }}
            >
              <div
                style={{ backgroundColor: teamMember.roleColor }}
                className={`bg-gray-med w-12 h-12 m-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">
                  {teamMember.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryRoleFrequencies;
