import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";
import PairamidTable from "./PairamidTable";

const getColor = (primary, secondary, totalPairs) => {
  const frequencies = Object.values(primary.frequencies);
  const average = Math.round(
    frequencies.reduce((total, count) => {
      return (total += count);
    }, 0) / totalPairs
  );
  const totalPerUser = primary.frequencies[secondary] || 0;

  if (primary.username === secondary) {
    return "gray-med";
  }
  if (totalPerUser === 0 || totalPerUser < Math.round(average / 2)) {
    return "yellow";
  }
  if (totalPerUser > Math.round(average * 2)) {
    return "red";
  }
  return "green";
};

const RotatedFrequencyTable = ({
  startDate,
  endDate,
  primary,
  secondary,
  roles,
}) => {
  const { teamId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fDate = (date) => formatISO(date, { representation: "date" });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_URL}/team/${teamId}/frequency?startDate=${fDate(
          startDate
        )}&endDate=${fDate(endDate)}`
      )
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  const XUsers = secondary
    ? users.filter((user) => user.roleName === secondary)
    : users;
  const YUsers = primary
    ? users.filter((user) => user.roleName === primary)
    : users;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center relative">
        <PairamidTable
          users={[...new Set([...XUsers, ...YUsers])]}
          roles={roles}
        />
      </div>
      <div className="flex justify-center relative">
        <table className="absolute mb-40 mx-auto transform rotate-45">
          <thead>
            <tr className="">
              <td className="p-2">&nbsp;</td>
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
                    className={`border border-black text-center text-xl h-10 w-10 bg-${getColor(
                      user,
                      u.username,
                      XUsers.length
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
    </div>
  );
};

export default RotatedFrequencyTable;
