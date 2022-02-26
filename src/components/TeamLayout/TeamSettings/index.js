import React, { useState, useContext } from "react";
import RoleSettings from "./RoleSettings";
import TeamMemberSettings from "./TeamMemberSettings";
import { TeamContext } from "../TeamContext";

const TeamSettings = () => {
  const { team } = useContext(TeamContext);
  const [roles, setRoles] = useState(team.roles);

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <p className="text-2xl font-bold">{team.name}</p>
        <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline mb-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-xl">Settings</p>
          </div>
        </header>
        <div className="w-full">
          <TeamMemberSettings roles={roles} />
          <div className="border-b-2 border-gray-border my-4" />
          <RoleSettings roles={roles} setRoles={setRoles} />
        </div>
      </section>
    </main>
  );
};

export default TeamSettings;
