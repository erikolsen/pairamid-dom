import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import SimpleBarChart from "../../charts/SimpleBarChart";
import ProfileCalendar from "./ProfileCalendar";
import PairingSessionDuration from "./PairingSessionDuration";
import PairingAcrossRoles from "./PairingAcrossRoles";
import PrimaryRoleFrequencies from "./PrimaryRoleFrequencies";
import { TeamContext } from "../TeamContext";
import { subDays } from "date-fns";
const MonthlyStats = ({ teamMember, monthly }) => {
  return (
    <>
      <h2>Monthly Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 mb-4">
        <PairingSessionDuration sessions={monthly} teamMember={teamMember} />
        <PrimaryRoleFrequencies teamMember={teamMember} />
        <PairingAcrossRoles teamMember={teamMember} />
      </div>
      <div className="border-b-2 border-gray-border my-4" />
    </>
  );
};

const TeamMemberProfile = () => {
  const { frequency } = useContext(TeamContext);
  const { teamId, userId } = useParams();
  const [teamMember, setTeamMember] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/team/${teamId}/user/${userId}`).then((response) => {
      setTeamMember(response.data);
    });
  }, [setTeamMember, teamId, userId]);

  if (!teamMember || !frequency) {
    return <h1 className="m-12">Loading...</h1>;
  }
  const today = new Date();
  const lastMonth = subDays(today, 30);

  const allSessions = teamMember.activePairingSessions;
  const monthly = allSessions.filter((s) => new Date(s.createdAt) > lastMonth);

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <h1>Member {teamMember.username}</h1>
            <h1>{teamMember.team.name}</h1>
          </div>
        </header>

        {!teamMember.deleted && (
          <MonthlyStats teamMember={teamMember} monthly={monthly} />
        )}

        <h2>All Time Stats</h2>

        <div className="col-span-2 bg-white shadow-lg rounded-lg mb-4">
          <h2 className="mt-4 text-center">Distribution of Pairs</h2>
          <SimpleBarChart teamMember={teamMember} />
        </div>

        <div className="col-span-2 bg-white shadow-lg rounded-lg mb-4">
          <ProfileCalendar
            pairingSessions={allSessions}
            username={teamMember.username}
          />
        </div>
      </section>
    </main>
  );
};

export default TeamMemberProfile;
