import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants";
import DisplayTeamMember from "./DisplayTeamMember";
import { useParams } from "react-router-dom";
import CirclePlus from "../../../svg/CirclePlus";

const TeamMemberSettings = ({ roles }) => {
  const { teamId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/team/${teamId}/users`).then((response) => {
      setTeamMembers(response.data);
    });
  }, [roles, teamId]);

  const updateTeamMember = (data) => {
    axios
      .put(`${API_URL}/team/${teamId}/user/${data.userId}`, data)
      .then((response) => {
        setTeamMembers(
          teamMembers.map((teamMember) =>
            teamMember.id === response.data.id
              ? Object.assign({}, response.data)
              : teamMember
          )
        );
      });
  };

  const addTeamMember = () => {
    axios.post(`${API_URL}/team/${teamId}/user`).then((response) => {
      setTeamMembers([...teamMembers, response.data]);
    });
  };

  const deleteTeamMember = (id) => {
    axios.delete(`${API_URL}/team/${teamId}/user/${id}`).then((response) => {
      setTeamMembers(
        teamMembers
          .map((teamMember) =>
            teamMember.id === response.data.id
              ? Object.assign({}, response.data)
              : teamMember
          )
          .filter((u) => !u.hardDelete)
      );
    });
  };

  const reviveTeamMember = (id) => {
    axios
      .put(`${API_URL}/team/${teamId}/user/${id}/revive`)
      .then((response) => {
        setTeamMembers(
          teamMembers.map((teamMember) =>
            teamMember.id === response.data.id
              ? Object.assign({}, response.data)
              : teamMember
          )
        );
      });
  };

  const usersList = teamMembers.map((teamMember) => (
    <DisplayTeamMember
      key={teamMember.id}
      teamMember={teamMember}
      roles={roles}
      reviveTeamMember={reviveTeamMember}
      updateTeamMember={updateTeamMember}
      onDelete={deleteTeamMember}
    />
  ));
  return (
    <div>
      <div className="my-2">
        <h2>Members</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">{usersList}</div>
      <button
        data-cy="add-user"
        onClick={addTeamMember}
        className="flex items-center"
      >
        <CirclePlus />
        <span className="mx-2 text-gray">Add Member</span>
      </button>
    </div>
  );
};

export default TeamMemberSettings;
