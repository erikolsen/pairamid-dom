import React, { useContext } from "react";
import PyramidChart from "../../charts/PyramidChart";
import { TeamContext } from "../TeamContext";
import {
  mostPairedWithRole,
  roleMapping,
} from "../TeamToday/PairGrid/Pair/recommendationHelper";
import _ from "lodash";
import PairingSessionDuration from "./PairingSessionDuration";
import PairingAcrossRoles from "./PairingAcrossRoles";
import PrimaryRoleFrequencies from "./PrimaryRoleFrequencies";

const RED = "#ED643B";
const YELLOW = "#EDAA3B";
const GREEN = "#00BB85";
const GRAY = "#C7C7C7";

const tagColor = (days) => {
  switch (true) {
    case days === 1 || days === 2:
      return GREEN;
    case days === 3 || days === 4:
      return YELLOW;
    default:
      return RED;
  }
};

const sessionColors = (sessions) => {
  const data = {
    [RED]: 0,
    [YELLOW]: 0,
    [GREEN]: 0,
  };

  const labels = {
    [RED]: "5+ Days",
    [YELLOW]: "3-4 Days",
    [GREEN]: "1-2 Days",
  };

  const colorCount = Object.entries(sessions)
    .map(([day, count]) => [tagColor(parseInt(day)), count])
    .reduce(
      (acc, [color, count]) => ({ ...acc, [color]: acc[color] + count }),
      data
    );

  return Object.entries(colorCount)
    .sort((a, b) => a[1] - b[1])
    .map(([color, count], index) => ({
      value: index + 1,
      name: labels[color],
      count: count,
      fill: color,
    }))
    .reverse();
};

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

const MonthlyStats = ({ teamMember, sessions }) => {
  const {
    frequency,
    team: { teamMembers, roles },
  } = useContext(TeamContext);

  const foo = sessionColors(sessions);

  const activeRoles = new Set(
    frequency
      .filter((freq) => _.sum(Object.values(freq.frequencies)) > 0)
      .map((role) => role.roleName)
  );

  const myFreq = frequency.find((m) => m.username === teamMember.username);
  const roleFreq = roleMapping(frequency);

  const roleCounts = Object.entries(myFreq.frequencies)
    .sort((a, b) => a[1] - b[1])
    .map(([name, count]) => [roleFreq[name], count])
    .filter(([name, _]) => activeRoles.has(name))
    .reduce(
      (acc, [name, count]) => ({
        ...acc,
        [name]: (acc[name] || 0) + count,
      }),
      {}
    );

  const roleData = Object.entries(roleCounts)
    .sort((a, b) => a[1] - b[1])
    .map(([name, count], index) => ({
      value: index + 1,
      name: name,
      count: count,
      fill: roles.find((r) => r.name === name).color,
    }));

  const primaryRole = mostPairedWithRole(myFreq, roleFreq);
  const relUsers = teamMembers
    .filter((u) => u.username !== teamMember.username)
    .filter((u) => u.role.name === primaryRole);

  const roleRecommendations = roleData
    .filter((role) => role.name !== primaryRole)
    .slice(0, 3);

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

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
      <PairingSessionDuration sessions={sessions} />
      <PairingAcrossRoles teamMember={teamMember} />
      <PrimaryRoleFrequencies teamMember={teamMember} />

      <div className="col-span-1 md:col-span-1">
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Pairing Session Durations</h2>
          <PyramidChart data={foo} />
        </div>
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Cross Pairing Recommendations</h2>
          <div className="flex justify-center py-4">
            {roleRecommendations.map((role) => (
              <div
                key={role.name}
                style={{ backgroundColor: role.fill }}
                className={`w-1/3 p-3 mx-2 border-gray-border flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">{role.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2 md:col-span-1">
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Pairing Across Roles</h2>
          <PyramidChart data={roleData.reverse()} />
        </div>
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Cross Pairing Recommendations</h2>
          <div className="flex justify-center py-4">
            {roleRecommendations.map((role) => (
              <div
                key={role.name}
                style={{ backgroundColor: role.fill }}
                className={`w-1/3 p-3 mx-2 border-gray-border flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">{role.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2 md:col-span-1">
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Primary Role Frequencies</h2>
          <PyramidChart data={data.reverse()} />
        </div>
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="mt-4 text-center">Pair Recommendations</h2>
          <div className="flex justify-center p-2">
            {recommendedList.map((teamMember) => (
              <div
                key={teamMember.name}
                style={{ backgroundColor: teamMember.roleColor }}
                className={`bg-gray-med w-12 h-12 mr-3 my-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">
                  {teamMember.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
