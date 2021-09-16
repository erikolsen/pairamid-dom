import React from "react";
import { frequencyColor } from "./frequencyColor";

const RotatedTable = ({ XUsers, YUsers }) => {
  return (
    <div>
      <table className="absolute mb-40 mx-auto transform rotate-45">
        <thead>
          <tr className="">
            <td className="h-10 w-10"></td>
            {XUsers.map((user) => (
              <td
                className="text-center font-bold h-10 w-10"
                key={user.username}
              >
                {user.username}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {YUsers.map((user) => (
            <tr key={user.username}>
              <td className="text-center font-bold transform -rotate-90 h-10 w-10">
                {user.username}
              </td>
              {XUsers.map((u) => (
                <td
                  className={`border border-black text-center text-xl h-10 w-10 ${frequencyColor(
                    user,
                    user.frequencies[u.username],
                    XUsers
                  )}`}
                  key={u.username}
                >
                  <p className="transform -rotate-45">
                    {user.frequencies[u.username] || 0}
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
