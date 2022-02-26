import React from "react";
import { frequencyColor } from "./frequencyColor";

const RotatedTable = ({ XTeamMembers, YTeamMembers }) => {
  return (
    <div>
      <table className="absolute mb-40 mx-auto transform rotate-45">
        <thead>
          <tr className="">
            <td className="h-10 w-10"></td>
            {XTeamMembers.map((teamMember) => (
              <td
                className="text-center font-bold h-10 w-10"
                key={teamMember.username}
              >
                {teamMember.username}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {YTeamMembers.map((teamMember) => (
            <tr key={teamMember.username}>
              <td className="text-center font-bold transform -rotate-90 h-10 w-10">
                {teamMember.username}
              </td>
              {XTeamMembers.map((u) => (
                <td
                  className={`border border-black text-center text-xl h-10 w-10 ${frequencyColor(
                    teamMember,
                    teamMember.frequencies[u.username],
                    XTeamMembers.map((u) => u.username)
                  )}`}
                  key={u.username}
                >
                  <p className="transform -rotate-45">
                    {teamMember.frequencies[u.username] || 0}
                  </p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RotatedTable;
