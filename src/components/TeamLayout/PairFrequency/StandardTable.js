import React from "react";
import { frequencyColor } from "./frequencyColor";
import RoleSelect from "./RoleSelect";

const totalsForUser = (user, relevantUsers) =>
  relevantUsers
    .map((name) => user.frequencies[name] || 0)
    .reduce((total, count) => {
      return (total += count);
    }, 0);

const StandardTable = ({
  users,
  roles,
  primary,
  setPrimary,
  secondary,
  setSecondary,
}) => {
  const XUsers = secondary
    ? users.filter((user) => user.roleName === secondary)
    : users;
  const YUsers = primary
    ? users.filter((user) => user.roleName === primary)
    : users;

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
            {XUsers.map((user) => (
              <td className="text-center font-bold" key={user.username}>
                {user.username}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {YUsers.map((user) => (
            <tr key={user.username}>
              <td className="text-left font-bold">
                {`${user.username}: ${totalsForUser(
                  user,
                  XUsers.map((u) => u.username)
                )}`}
              </td>
              {XUsers.map((u) => (
                <td
                  className={`border border-black text-center text-xl ${frequencyColor(
                    user,
                    user.frequencies[u.username],
                    XUsers.map((xu) => xu.username),
                    user == u
                  )}`}
                  key={u.username}
                >
                  {user.frequencies[u.username] || 0}
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
