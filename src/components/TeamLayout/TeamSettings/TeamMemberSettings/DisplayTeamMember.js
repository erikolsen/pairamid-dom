import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faBan,
  faTrashRestore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const IconButton = ({ action, icon, classes, title }) => {
  const onClick = (e) => {
    e.preventDefault();
    action();
  };

  return (
    <button
      className={`focus:outline-none ${classes}`}
      onClick={onClick}
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

const DisplayCard = ({
  teamMember,
  setEditing,
  onDelete,
  reviveTeamMember,
}) => {
  const { teamId } = useParams();
  const inActive = teamMember.deleted ? "opacity-50" : "";
  const color = teamMember.role ? teamMember.role.color : "gray";

  return (
    <div className="bg-white shadow-lg rounded-lg mr-4 mb-4">
      <div className={`flex justify-between my-2 ${inActive}`}>
        <div
          className="relative cursor-pointer"
          onClick={() => setEditing(true)}
          title="Edit"
        >
          <div
            style={{ backgroundColor: color }}
            className={`bg-gray-med w-12 h-12 mx-2 border-gray-border rounded-full flex items-center justify-center`}
          >
            <p className="text-white font-bold text-xs">
              {teamMember.username}
            </p>
          </div>
          <div style={{ borderColor: color }} className="profile-edit-icon">
            <FontAwesomeIcon className="" icon={faPencilAlt} size="xs" />
          </div>
        </div>
        <div className="mr-4">
          <p className="text-right text-sm">Joined</p>
          <p className="text-right text-sm">
            {format(Date.parse(teamMember.createdAt), "MM/dd/yyyy")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between m-2">
        {inActive ? (
          <div className="flex">
            <IconButton
              action={() => reviveTeamMember(teamMember.id)}
              icon={faTrashRestore}
              classes="text-green"
              title="Unarchive"
            />
            <p className="opacity-50 mx-2">Archived</p>
          </div>
        ) : (
          <div className="">
            <IconButton
              action={() => onDelete(teamMember.id)}
              icon={faTrashAlt}
              classes="text-red"
              title="Archive"
            />
          </div>
        )}
        <Link to={`/team/${teamId}/users/${teamMember.uuid}`}>
          <div className="mx-2" title="Profile">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </div>
    </div>
  );
};

const EditCard = ({ teamMember, roles, setEditing, onUpdate, onDelete }) => {
  const { register, handleSubmit, errors } = useForm();
  const [initials, setInitials] = useState(teamMember.username || "");
  const [roleId, setRoleId] = useState(
    teamMember.role ? teamMember.role.id : ""
  );
  const selectedRole = roles.find((role) => role.id === parseInt(roleId));
  const color = selectedRole ? selectedRole.color : "gray";
  const cancelAction = teamMember.username ? (
    <IconButton action={() => setEditing(false)} icon={faBan} title="Cancel" />
  ) : (
    <IconButton
      action={() => onDelete(teamMember.id)}
      icon={faTrashAlt}
      classes="text-red"
      title="Archive"
    />
  );

  const classes = errors.initials
    ? "border border-red"
    : "border-b border-gray-border";
  return (
    <div className="bg-white shadow-lg rounded-lg mr-4 mb-4">
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className="">
          <div className="grid grid-cols-4 mx-2 my-4 flex items-center">
            <div
              style={{ backgroundColor: color }}
              className={`bg-gray-med col-span-1 w-10 h-10 border-gray-border rounded-full flex items-center justify-center`}
            >
              <p className="text-white font-bold text-xs">
                {initials.toUpperCase()}
              </p>
            </div>
            <div className="col-span-3">
              <div className="relative appearance-none label-floating">
                <input
                  className={`w-full pt-1 px-3 leading-normal outline-none ${classes}`}
                  onChange={(e) => setInitials(e.target.value)}
                  id="initials"
                  data-cy="user-initials-input"
                  type="text"
                  name="initials"
                  placeholder="Initials"
                  defaultValue={teamMember.username}
                  ref={register({ required: true, maxLength: 3, minLength: 2 })}
                />
                {errors.initials && (
                  <p className="text-red">2-3 Character limit</p>
                )}
                <label
                  className="absolute block text-green-darker top-0 left-0 w-full px-3 pb-2 leading-normal"
                  htmlFor="initials"
                >
                  Initials
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1"></p>
            <div className="relative col-span-3 mr-2">
              <select
                onChange={(e) => setRoleId(e.target.value)}
                data-cy="user-role-select"
                name="roleId"
                value={roleId}
                ref={register}
                className="block appearance-none w-full bg-white border-b border-gray-border px-2 pb-2 pr-8 rounded leading-tight"
              >
                <option value="">Select a Role</option>
                {roles.map((role) => (
                  <option key={role.id} className="" value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <input
          className=""
          type="hidden"
          name="userId"
          defaultValue={teamMember.id}
          ref={register}
        />
        <div className="flex justify-between mx-2">
          {cancelAction}
          <input
            data-cy="user-submit"
            className="m-2 px-2 border border-green rounded text-white bg-green text-xs font-bold"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

const DisplayTeamMember = ({
  teamMember,
  roles,
  updateTeamMember,
  onDelete,
  reviveTeamMember,
}) => {
  const [editing, setEditing] = useState(!teamMember.username);
  const onUpdate = (data) => {
    updateTeamMember(data);
    setEditing(false);
  };

  return editing ? (
    <EditCard
      teamMember={teamMember}
      roles={roles}
      setEditing={setEditing}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  ) : (
    <DisplayCard
      teamMember={teamMember}
      setEditing={setEditing}
      onDelete={onDelete}
      reviveTeamMember={reviveTeamMember}
    />
  );
};

export default DisplayTeamMember;
