import React, { useContext } from "react";
import PyramidChart from "../../charts/PyramidChart";
import { TeamContext } from "../TeamContext";
import {
  mostPairedWithRole,
  roleMapping,
} from "../TeamToday/PairGrid/Pair/recommendationHelper";
import _ from "lodash";

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

const MonthlyStats = ({ user }) => {
  const {
    frequency,
    team: { users, roles },
  } = useContext(TeamContext);

  const activeRoles = new Set(
    frequency
      .filter((freq) => _.sum(Object.values(freq.frequencies)) > 0)
      .map((role) => role.roleName)
  );

  const myFreq = frequency.find((u) => u.username === user.username);
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
      color: roles.find((r) => r.name === name).color,
    }));

  const primaryRole = mostPairedWithRole(myFreq, roleFreq);
  const relUsers = users
    .filter((u) => u.username !== user.username)
    .filter((u) => u.role.name === primaryRole);

  const roleRecommendations = roleData
    .filter((role) => role.name !== primaryRole)
    .slice(0, 3);

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
    color: frequencyColor(
      myFreq,
      myFreq.frequencies[u.username],
      relUsers.map((u) => u.username)
    ),
  }));

  const recommendedList = data.slice(0, 3);

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
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
                style={{ backgroundColor: role.color }}
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
            {recommendedList.map((user) => (
              <div
                key={user.name}
                style={{ backgroundColor: user.roleColor }}
                className={`bg-gray-med w-12 h-12 mr-3 my-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">{user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStats;
