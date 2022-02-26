import React from "react";
import { frequencyColor } from "./frequencyColor";
import RoleSelect from "./RoleSelect";

const totalsForUser = (teamMember, relevantTeamMembers) =>
  relevantTeamMembers
    .map((name) => teamMember.frequencies[name] || 0)
    .reduce((total, count) => {
      return (total += count);
    }, 0);

const StandardTable = ({
  teamMembers,
  roles,
  primary,
  setPrimary,
  secondary,
  setSecondary,
}) => {
  const XTeamMembers = secondary
    ? teamMembers.filter((teamMember) => teamMember.roleName === secondary)
    : teamMembers;
  const YTeamMembers = primary
    ? teamMembers.filter((teamMember) => teamMember.roleName === primary)
    : teamMembers;

  return (
    <div>
      <form>
        <p className="text-xl font-bold mb-2">Compare Roles</p>
        <div className="flex justify-between">
          <RoleSelect
            label="Focused Role( y-axis )"
            roles={roles}
            onSelect={setPrimary}
            selected={primary}
          />
          <RoleSelect
            label="Compared Role( x-axis )"
            roles={roles}
            onSelect={setSecondary}
            selected={secondary}
          />
        </div>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr className="">
            <td></td>
            {XTeamMembers.map((teamMember) => (
              <td className="text-center font-bold" key={teamMember.username}>
                {teamMember.username}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {YTeamMembers.map((teamMember) => (
            <tr key={teamMember.username}>
              <td className="text-left font-bold">
                {`${teamMember.username}: ${totalsForUser(
                  teamMember,
                  XTeamMembers.map((u) => u.username)
                )}`}
              </td>
              {XTeamMembers.map((u) => (
                <td
                  className={`border border-black text-center text-xl ${frequencyColor(
                    teamMember,
                    teamMember.frequencies[u.username],
                    XTeamMembers.map((xu) => xu.username),
                    teamMember == u
                  )}`}
                  key={u.username}
                >
                  {teamMember.frequencies[u.username] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandardTable;
