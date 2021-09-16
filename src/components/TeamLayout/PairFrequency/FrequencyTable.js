import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";
import PairamidTable from "./PairamidTable";
import StandardTable from "./StandardTable";
// import RotatedTable from "./RotatedTable";

const TABLE_VIEWS = {
  "Pairamid Modern": PairamidTable,
  "Standard Table": StandardTable,
  // "Pairamid Comparable": RotatedTable,
};

const FrequencyTable = ({ startDate, endDate, primary, secondary, roles }) => {
  const { teamId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fDate = (date) => formatISO(date, { representation: "date" });
  const [selectedTable, setSelectedTable] = useState("Pairamid Modern");
  const TableComponent = (props) => {
    console.log("props: ", props);
    const Component = TABLE_VIEWS[selectedTable];
    return <Component {...props} />;
  };

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
      <div className="flex items-center mb-10 space-x-4">
        {Object.keys(TABLE_VIEWS).map((name) => (
          <div
            className="border-2 px-4 py-2 "
            key={name}
            onClick={() => setSelectedTable(name)}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="h-20" />
      <div className="relative flex justify-center">
        <TableComponent
          XUsers={XUsers}
          YUsers={YUsers}
          roles={roles}
          primary={primary}
          secondary={secondary}
        />
      </div>
    </div>
  );
};

export default FrequencyTable;
