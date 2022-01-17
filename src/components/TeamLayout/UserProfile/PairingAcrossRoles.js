import React, { useContext } from "react";
import PyramidChart from "../../charts/PyramidChart";
import { TeamContext } from "../TeamContext";
import {
  mostPairedWithRole,
  roleMapping,
} from "../TeamToday/PairGrid/Pair/recommendationHelper";
import _ from "lodash";

const PairingAcrossRoles = ({ user }) => {
  const {
    frequency,
    team: { roles },
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
      fill: roles.find((r) => r.name === name).color,
    }));

  const primaryRole = mostPairedWithRole(myFreq, roleFreq);

  const roleRecommendations = roleData
    .filter((role) => true || role.name !== primaryRole)
    .slice(0, 2);

  const options = {
    position: "insideBottom",
    fill: "#fff",
  };

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="mt-4 text-center">Pairing Across Roles</h2>
        <PyramidChart data={roleData.reverse()} labelOptions={options} />
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <p className="mt-4 text-center font-bold">
          Cross Pairing Recommendations
        </p>
        <div className="flex justify-center p-2">
          {roleRecommendations.map((role) => (
            <div
              key={role.name}
              style={{ backgroundColor: role.fill }}
              className={`h-12 w-1/3 px-2 m-2 border-gray-border flex items-center justify-center rounded-lg`}
            >
              <p className="text-white font-bold text-xs">{role.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PairingAcrossRoles;
