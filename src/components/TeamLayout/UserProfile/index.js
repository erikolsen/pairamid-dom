import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import SimpleBarChart from "../../charts/SimpleBarChart";
import ProfileCalendar from "./ProfileCalendar";
import MonthlyStats from "./MonthlyStats";

const UserProfile = () => {
  const { teamId, userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/team/${teamId}/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [setUser, teamId, userId]);

  if (!user) {
    return <h1 className="m-12">Loading...</h1>;
  }

  const allSessions = user.active_pairing_sessions;

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <h1>User {user.username}</h1>
            <h1>{user.team.name}</h1>
          </div>
        </header>

        <h2>Monthly Stats</h2>
        <MonthlyStats user={user} />

        <div className="border-b-2 border-gray-border my-4" />
        <h2>All Time Stats</h2>

        <div className="col-span-2 bg-white shadow-lg rounded-lg mb-4">
          <h2 className="mt-4 text-center">Distribution of Pairs</h2>
          <SimpleBarChart user={user} />
        </div>

        <div className="col-span-2 bg-white shadow-lg rounded-lg mb-4">
          <ProfileCalendar
            pairingSessions={allSessions}
            username={user.username}
          />
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
