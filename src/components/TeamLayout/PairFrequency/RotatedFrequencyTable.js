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
  const [teamMembers, setTeamMembers] = useState([]);
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
        setTeamMembers(response.data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  const XTeamMembers = secondary
    ? teamMembers.filter((teamMember) => teamMember.roleName === secondary)
    : teamMembers;
  const YTeamMembers = primary
    ? teamMembers.filter((teamMember) => teamMember.roleName === primary)
    : teamMembers;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center relative">
        <PairamidTable
          teamMembers={[...new Set([...XTeamMembers, ...YTeamMembers])]}
          roles={roles}
        />
      </div>
      <div className="flex justify-center relative">
        <table className="absolute mb-40 mx-auto transform rotate-45">
          <thead>
            <tr className="">
              <td className="p-2">&nbsp;</td>
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
                    className={`border border-black text-center text-xl h-10 w-10 bg-${getColor(
                      teamMember,
                      u.username,
                      XTeamMembers.length
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
    </div>
  );
};

export default RotatedFrequencyTable;
