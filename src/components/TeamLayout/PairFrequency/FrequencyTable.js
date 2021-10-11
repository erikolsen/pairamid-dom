import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";

const largestRole = (roles) =>
  roles
    .sort(
      (a, b) =>
        roles.filter((v) => v === a).length -
        roles.filter((v) => v === b).length
    )
    .pop();

const FrequencyTable = ({ startDate, endDate, roles, TableComponent }) => {
  if (!roles.length) {
    return null;
  }

  const { teamId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();

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
        console.log("response.data: ", response.data);
        setUsers(response.data);
        setPrimary(largestRole(response.data.map((u) => u.roleName)));
        setSecondary(largestRole(response.data.map((u) => u.roleName)));
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <TableComponent
        primary={primary}
        setPrimary={setPrimary}
        secondary={secondary}
        setSecondary={setSecondary}
        users={users}
        roles={roles}
      />
    </div>
  );
};

export default FrequencyTable;
