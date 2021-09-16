import React from "react";
import { frequencyColor } from "./frequencyColor";

const PairamidTable = ({ XUsers, YUsers, roles }) => {
  if (!roles.length) {
    return null;
  }
  const users = [...new Set([...XUsers, ...YUsers])];
  const names = users.map((u) => u.username);
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
    <div className="absolute flex transform rotate-45">
      {users.map((user) => (
        <div key={user.username} className="">
          {frequenciesForUser(user).map((data, index) => (
            <div
              key={`${user.username}-${index}`}
              className={`border-2 h-10 w-10 flex items-center justify-center ${frequencyColor(
                user,
                data,
                YUsers
              )}`}
            >
              <span className="text-center transform -rotate-45">
                {data || 0}
              </span>
            </div>
          ))}
          <div
            style={{ backgroundColor: colorOfRole(user.roleName) }}
            className={`border-l-2 border-t-2 h-10 w-10 flex items-center justify-center`}
          >
            <span className="text-center transform -rotate-45">
              {user.username}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PairamidTable;
