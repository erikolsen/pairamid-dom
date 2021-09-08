import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";

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

const FrequencyTable = ({ startDate, endDate, primary, secondary }) => {
  const { teamId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fDate = (date) => formatISO(date, { representation: "date" });
  const totalsForUser = (user) =>
    Object.values(user.frequencies).reduce((total, count) => {
      return (total += count);
    }, 0);

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
                className={`border border-black text-center text-xl bg-${getColor(
                  user,
                  u.username,
                  XUsers.length
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

export default FrequencyTable;
