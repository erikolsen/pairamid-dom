import React, { useContext } from "react";
import User from "../User";
import { TeamContext } from "../../../TeamContext";
import { leastPairedWith } from "./recommendationHelper";

const UserRecommendation = ({ username }) => {
  return (
    <div
      title="Recommended Pair"
      className={`w-12 h-12 mr-3 my-2 border-4 border-dashed border-gray-med rounded-full bg-white flex items-center justify-center`}
    >
      <p className="text-gray-med font-bold text-sm">{username}</p>
    </div>
  );
};

const MultiUserPair = ({ pair }) => {
  return pair.team_members.map((user, i) => (
    <User index={i} user={user} key={user.uuid} />
  ));
};

const SingleUserPair = ({ pair }) => {
  const { frequency, pairs } = useContext(TeamContext);
  const excluded = pairs
    .filter((p) => p.info !== "UNPAIRED")
    .flatMap((pair) => pair.team_members.map((u) => u.username));

  return [
    <User
      index={0}
      user={pair.team_members[0]}
      key={pair.team_members[0].uuid}
    />,
    leastPairedWith(pair.team_members[0], frequency, excluded).map(
      (username) => <UserRecommendation username={username} key={username} />
    ),
  ];
};

const EmptyPair = ({ pair, onDelete }) => {
  return (
    <div className="">
      <button
        onClick={() => onDelete(pair)}
        className="text-2xl text-red absolute top-0 right-0 mr-2 mt-2"
        title="Delete Pair"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div
        className={`w-12 h-12 mr-2 my-2 border-4 border-dashed border-gray-med rounded-full bg-white flex items-center justify-center`}
      >
        <p className="text-gray-med font-bold text-xl">+</p>
      </div>
    </div>
  );
};

const UserList = ({ pair, onDelete }) => {
  switch (pair.team_members.length) {
    case 0:
      return <EmptyPair pair={pair} onDelete={onDelete} />;
    case 1:
      return <SingleUserPair pair={pair} />;
    default:
      return <MultiUserPair pair={pair} />;
  }
};

export default UserList;
