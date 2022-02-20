import React from "react";

const PairNames = ({ pair }) => {
  let names = pair.teamMembers.map((user) => `${user.username}`);
  let info = pair.info ? " - " + pair.info : "";
  let pairText =
    names.length === 1 ? `${names[0]} (solo)` : `${names.join(" & ")}`;
  return (
    <li>
      {pairText.toUpperCase()} {info}
    </li>
  );
};

export default PairNames;
