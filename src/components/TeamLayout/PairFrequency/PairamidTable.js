import React from "react";
import { frequencyColor } from "./frequencyColor";
import RoleSelect from "./RoleSelect";

const PairamidTable = ({
  teamMembers,
  roles,
  primary,
  setPrimary,
  setSecondary,
}) => {
  if (!roles.length) {
    return null;
  }

  const setRole = (name) => {
    setPrimary(name);
    setSecondary(name);
  };

  const filteredTeamMembers = primary
    ? teamMembers.filter((teamMember) => teamMember.roleName === primary)
    : teamMembers;

  const names = filteredTeamMembers.map((u) => u.username);

  const frequenciesForTeamMember = (teamMember) => {
    const teamMemberToShow = names.slice(
      names.indexOf(teamMember.username) + 1,
      names.length
    );
    return teamMemberToShow
      .map((username) => teamMember.frequencies[username])
      .reverse();
  };

  const colorOfRole = (name) => {
    return roles.find((role) => role.name == name).color;
  };

  return (
    <div className="">
      <form>
        <p className="text-xl font-bold">Select Role</p>
        <div className="flex justify-between">
          <RoleSelect
            label="Role"
            roles={roles}
            onSelect={setRole}
            selected={primary}
          />
        </div>
      </form>
      <div className="flex justify-center py-4">
        <div className="inline-flex transform origin-bottom-left rotate-45 -translate-y-1/3 -translate-x-1/4">
          {filteredTeamMembers.map((teamMember) => (
            <div key={teamMember.username} className="flex-col">
              {frequenciesForTeamMember(teamMember).map((data, index) => (
                <div
                  key={`${teamMember.username}-${index}`}
                  className={`border-2 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center ${frequencyColor(
                    teamMember,
                    data,
                    filteredTeamMembers
                      .filter((u) => u.username !== teamMember.username)
                      .map((u) => u.username)
                  )}`}
                >
                  <span className="text-xs md:text-lg text-center transform -rotate-45">
                    {data || 0}
                  </span>
                </div>
              ))}
              <div
                style={{ backgroundColor: colorOfRole(teamMember.roleName) }}
                className={`border-l-2 border-t-2 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center`}
              >
                <span className="text-white text-xs md:text-lg text-center transform -rotate-45">
                  {teamMember.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PairamidTable;
