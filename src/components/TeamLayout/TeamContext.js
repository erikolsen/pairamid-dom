import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const defaultValue = {
  team: null,
  frequency: null,
};

export const TeamContext = React.createContext(defaultValue);

export const TeamContextProvider = ({ children }) => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(defaultValue.team);
  const [frequency, setFrequency] = useState(null);
  useEffect(() => {
    const initialize = () => {
      axios.get(`${API_URL}/team/${teamId}`).then((response) => {
        setTeam(response.data);
      });
      axios.get(`${API_URL}/team/${teamId}/frequency`).then((response) => {
        setFrequency(response.data);
      });
    };
    initialize();
  }, [teamId, setTeam]);
  console.log("frequency: ", frequency);
  if (!team) {
    return <div>Loading...</div>;
  }
  return (
    <TeamContext.Provider value={{ ...defaultValue, team, frequency }}>
      {children}
    </TeamContext.Provider>
  );
};
