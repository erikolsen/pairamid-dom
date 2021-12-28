import React, { useState, useEffect } from "react";
import DailyView from "./DailyView";
import SocketHandler from "./SocketHandler";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";

const Team = () => {
  const { teamId } = useParams();
  const [pairs, setPairs] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/team/${teamId}/pairing_sessions/daily`)
      .then((response) => {
        setPairs(response.data);
      });
  }, [setPairs]);

  if (!pairs) {
    return null;
  }

  return (
    <div className="col-span-7">
      <SocketHandler requestedData={pairs.length}>
        <DailyView setPairs={setPairs} pairs={pairs} />
      </SocketHandler>
    </div>
  );
};
export default Team;
