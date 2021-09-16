import React from "react";
import { frequencyColor } from "./frequencyColor";
const totalsForUser = (user) =>
  Object.values(user.frequencies).reduce((total, count) => {
    return (total += count);
  }, 0);

const StandardTable = ({ XUsers, YUsers }) => {
  return (
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
              {user.username}: {totalsForUser(user)}
            </td>
            {XUsers.map((u) => (
              <td
                className={`border border-black text-center text-xl ${frequencyColor(
                  user,
                  user.frequencies[u.username],
                  XUsers
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
  );
};

export default StandardTable;
