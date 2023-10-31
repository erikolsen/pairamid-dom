import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link, useRouteMatch } from "react-router-dom";
import useContextMenu from "./Pair/useContextMenu";
import { leastPairedWith } from "./Pair/recommendationHelper";
import { TeamContext } from "../../TeamContext";

const Menu = ({ teamMember }) => {
  const match = useRouteMatch();
  const {
    frequency,
    pairs,
    team: { teamMembers },
  } = useContext(TeamContext);

  const roleColor = (name) =>
    teamMembers.find((u) => u.username === name).role.color;

  const excluded = pairs
    .filter((p) => p.info !== "UNPAIRED")
    .flatMap((pair) => pair.teamMembers.map((u) => u.username));
  const recommendedList = leastPairedWith(teamMember, frequency, excluded, 4);

  return (
    <div className="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
      <div className="flex hover:bg-gray-100 py-1 px-2 rounded">
        <Link
          to={`${match.url}/users/${teamMember.uuid}`}
          className="text-gray-900"
        >
          <span className="text-base font-light">View profile</span>
        </Link>
      </div>
      {recommendedList.length > 0 && (
        <>
          <hr className="my-3 border-gray-300" />
          <div className="py-1 px-2 rounded">
            <div className="text-gray-900">
              <span className="text-base text-center">Pair recommendations</span>
            </div>
            <div className="flex">
              {recommendedList.map((name) => (
                <div
                  key={name}
                  style={{ backgroundColor: roleColor(name) }}
                  className={`bg-gray-med w-8 h-8 mr-3 my-2 border-gray-border rounded-full flex items-center justify-center`}
                >
                  <p className="text-white font-bold text-xs">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TeamMember = ({ teamMember, index }) => {
  const ClickZone = useContextMenu();

  return (
    <div>
      <Draggable draggableId={teamMember.uuid} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            data-cy={`icon-${teamMember.username}`}
          >
            <ClickZone menu={<Menu teamMember={teamMember} />}>
              <div
                style={{ backgroundColor: teamMember.role.color }}
                className={`bg-gray-med w-12 h-12 mr-3 my-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">
                  {teamMember.username}
                </p>
              </div>
            </ClickZone>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default TeamMember;
