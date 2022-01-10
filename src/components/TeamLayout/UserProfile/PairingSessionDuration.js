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
  const data = {
    [RED]: 0,
    [YELLOW]: 0,
    [GREEN]: 0,
  };

  const labels = {
    [RED]: "5+ Days",
    [YELLOW]: "3-4 Days",
    [GREEN]: "1-2 Days",
  };

  const pairDurations = Object.entries(sessions)
    .map(([day, count]) => [tagColor(parseInt(day)), count])
    .reduce(
      (acc, [color, count]) => ({ ...acc, [color]: acc[color] + count }),
      data
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

  const pairs = _.groupBy(sessions, (p) =>
    p.users.filter((u) => u.username !== user.username).map((u) => u.username)
  );
  const recomendations = Object.entries(pairs)
    .map(([pair, arr]) => [pair, ...countMax(arr.map((el) => el.streak))])
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .slice(0, 3)
    .map(([pair, max, _count]) => [
      users.find((u) => u.username === pair),
      max,
    ]);

  const sessionData = sessionColors(_.countBy(pairStats(sessions)));

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="mt-4 text-center">Pairing Session Durations</h2>
        <PyramidChart data={sessionData} />
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <p className="mt-4 text-center font-bold">Highest Durations Pairs</p>
        <div className="flex justify-center p-2">
          {recomendations.map(([user, max]) => (
            <div style={{ backgroundColor: tagColor(max) }} key={user.username}>
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
