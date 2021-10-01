import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";

const FrequencyTable = ({ startDate, endDate, roles, TableComponent }) => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <TableComponent users={users} roles={roles} />
    </div>
  );
};

export default FrequencyTable;
