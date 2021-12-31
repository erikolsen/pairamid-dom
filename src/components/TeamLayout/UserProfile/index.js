import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import LabeledPieChart from "../../charts/LabeledPieChart";
import SimpleBarChart from "../../charts/SimpleBarChart";
import ProfileCalendar from "./ProfileCalendar";
import PyramidChart from "../../charts/PyramidChart";
import { TeamContext } from "../TeamContext";
import {
  mostPairedWithRole,
  roleMapping,
} from "../TeamToday/PairGrid/Pair/recommendationHelper";

const RED = "#ED643B";
const YELLOW = "#EDAA3B";
const GREEN = "#00BB85";
const GRAY = "#C7C7C7";

export const frequencyColor = (target, value, relevantUsers, solo) => {
  const total = relevantUsers.reduce(
    (memo, user) => (memo += target.frequencies[user] || 0),
    0
  );
  const average = total / relevantUsers.length || 1;
  if (solo) return GRAY;
  if (!value || value < average / 2) return YELLOW;
  if (value > 1 && value > average * 2) return RED;
  return GREEN;
};

const UserProfile = () => {
  const { teamId, userId } = useParams();
  const [user, setUser] = useState(null);
  const {
    frequency,
    team: { users, roles },
  } = useContext(TeamContext);

  useEffect(() => {
    axios.get(`${API_URL}/team/${teamId}/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [setUser, teamId, userId]);

  if (!user) {
    return <h1 className="m-12">Loading...</h1>;
  }

  const myFreq = frequency.find((u) => u.username === user.username);
  const roleFreq = roleMapping(frequency);

  const roleCounts = Object.entries(myFreq.frequencies)
    .sort((a, b) => a[1] - b[1])
    .map(([name, count]) => [roleFreq[name], count])
    .reduce(
      (acc, [name, count]) => ({
        ...acc,
        [name]: (acc[name] || 0) + count,
      }),
      {}
    );

  const roleData = Object.entries(roleCounts)
    .sort((a, b) => a[1] - b[1])
    .map(([name, count], index) => ({
      value: index + 1,
      name: name,
      count: count,
      color: roles.find((r) => r.name === name).color,
    }))
    .reverse();

  const keyRole = mostPairedWithRole(myFreq, roleFreq);
  const relUsers = users
    .filter((u) => u.username !== user.username)
    .filter((u) => u.role.name === keyRole);

  const keyUsers = relUsers
    .reduce(
      (acc, user) => [
        ...acc,
        {
          username: user.username,
          count: myFreq.frequencies[user.username],
        },
      ],
      []
    )
    .sort((a, b) => a.count - b.count);

  const data = keyUsers
    .map((u, index) => ({
      value: index + 1,
      name: u.username,
      count: myFreq.frequencies[u.username],
      color: frequencyColor(
        myFreq,
        myFreq.frequencies[u.username],
        relUsers,
        u.username === user.username
      ),
    }))
    .reverse();

  const allSessions = user.active_pairing_sessions;
  const totalUsers = new Set(
    allSessions.flatMap((ps) => ps.users.map((u) => u.username))
  );
  const totalRoles = new Set(
    allSessions.flatMap((ps) => ps.users.map((u) => u.role.name))
  );

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <h1>User {user.username}</h1>
            <h1>{user.team.name}</h1>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg">
            <h2 className="mt-4 text-center">Pairing Across Roles</h2>
            <PyramidChart data={roleData} />
          </div>
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg">
            <h2 className="mt-4 text-center">Pair Frequencies</h2>
            <PyramidChart data={data} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg">
            <h2 className="mt-4 text-center">Pairing Totals</h2>
            <div className="my-2 flex justify-center">
              <div>
                <div
                  className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}
                >
                  <p className="text-center font-bold">{allSessions.length}</p>
                </div>
                <p className="text-center">Total</p>
                <p className="text-center">Sessions</p>
              </div>
              <div>
                <div
                  className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}
                >
                  <p className="text-center font-bold">{totalUsers.size}</p>
                </div>
                <p className="text-center">Different</p>
                <p className="text-center">Users</p>
              </div>
              <div>
                <div
                  className={`mt-4 mx-4 col-span-1 w-16 h-16 border-4 border-blue-400 rounded-full flex items-center justify-center`}
                >
                  <p className="text-center font-bold">{totalRoles.size}</p>
                </div>
                <p className="text-center">Unique</p>
                <p className="text-center">Roles</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg">
            <h2 className="mt-4 text-center">Pairing Across Roles</h2>
            <LabeledPieChart user={user} />
          </div>
        </div>

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
