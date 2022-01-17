import React, { useContext } from "react";
import PyramidChart from "../../charts/PyramidChart";
import { pairStats } from "./statsHelper";
import _ from "lodash";
import { TeamContext } from "../TeamContext";

const RED = "#ED643B";
const YELLOW = "#EDAA3B";
const GREEN = "#00BB85";

const tagColor = (days) => {
  switch (true) {
    case days === 1 || days === 2:
      return GREEN;
    case days === 3 || days === 4:
      return YELLOW;
    default:
      return RED;
  }
};

const sessionColors = (sessions) => {
  const labels = {
    [RED]: "5+",
    [YELLOW]: "3-4",
    [GREEN]: "1-2",
  };

  const pairDurations = Object.entries(sessions)
    .map(([day, count]) => [tagColor(parseInt(day)), count])
    .reduce(
      (acc, [color, count]) => ({ ...acc, [color]: acc[color] || 0 + count }),
      {}
    );

  return Object.entries(pairDurations)
    .sort((a, b) => a[1] - b[1])
    .map(([color, count], index) => ({
      value: index + 1,
      name: labels[color],
      count: count,
      fill: color,
    }))
    .reverse();
};

const countMax = (values) => {
  const max = Math.max(...values);
  return [max, values.filter((el) => el === max).length];
};

const PairingSessionDuration = ({ sessions, user }) => {
  const {
    team: { users },
  } = useContext(TeamContext);

  const noSolo = sessions.filter((p) => p.users.length > 1);

  const pairs = _.groupBy(noSolo, (p) =>
    p.users.filter((u) => u.username !== user.username).map((u) => u.username)
  );

  const recomendations = Object.entries(pairs)
    .filter(([pair, _arr]) => pair.split(",").length === 1)
    .map(([pair, arr]) => [pair, ...countMax(arr.map((el) => el.streak))])
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .slice(0, 3)
    .map(([pair, max, _count]) => [
      users.find((u) => u.username === pair),
      max,
    ]);

  const sessionData = sessionColors(_.countBy(pairStats(sessions)));

  const options = {
    position: "inside",
    fill: "#fff",
  };

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="mt-4 text-center">Pairing Duration in Days</h2>
        <PyramidChart data={sessionData} labelOptions={options} />
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <p className="mt-4 text-center font-bold">Highest Durations Pairs</p>
        <div className="flex justify-center p-2">
          {recomendations.map(([user, max]) => (
            <div
              className="rounded-md mx-2"
              style={{ backgroundColor: tagColor(max) }}
              key={user.username}
            >
              <div
                style={{ backgroundColor: user.role.color }}
                className={`bg-gray-med w-12 h-12 m-2 border-gray-border rounded-full flex items-center justify-center`}
              >
                <p className="text-white font-bold text-xs">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PairingSessionDuration;
