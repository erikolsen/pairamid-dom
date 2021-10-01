import React, { useState } from "react";
import { frequencyColor } from "./frequencyColor";
import RoleSelect from "./RoleSelect";

const largestRole = (roles) =>
  roles
    .sort(
      (a, b) =>
        roles.filter((v) => v === a).length -
        roles.filter((v) => v === b).length
    )
    .pop();

const PairamidTable = ({ users, roles }) => {
  if (!roles.length) {
    return null;
  }

  const [role, setRole] = useState(largestRole(users.map((u) => u.roleName)));

  const filteredUsers = role
    ? users.filter((user) => user.roleName === role)
    : users;

  const names = filteredUsers.map((u) => u.username);

  const frequenciesForUser = (user) => {
    const userToShow = names.slice(
      names.indexOf(user.username) + 1,
      names.length
    );
    return userToShow.map((username) => user.frequencies[username]).reverse();
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
            selected={role}
          />
        </div>
      </form>
      <div className="flex justify-center py-4">
        <div className="inline-flex transform origin-bottom-left rotate-45 -translate-y-1/4 -translate-x-1/4">
          {filteredUsers.map((user) => (
            <div key={user.username} className="flex-col">
              {frequenciesForUser(user).map((data, index) => (
                <div
                  key={`${user.username}-${index}`}
                  className={`border-2 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center ${frequencyColor(
                    user,
                    data,
                    filteredUsers.map((u) => u.username)
                  )}`}
                >
                  <span className="text-xs sm:text-medium md:text-lg text-center transform -rotate-45">
                    {data || 0}
                  </span>
                </div>
              ))}
              <div
                style={{ backgroundColor: colorOfRole(user.roleName) }}
                className={`border-l-2 border-t-2 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center`}
              >
                <span className="text-xs sm:text-medium md:text-lg text-center transform -rotate-45">
                  {user.username}
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
