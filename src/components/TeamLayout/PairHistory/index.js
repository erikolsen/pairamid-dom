import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";

const tagColor = (days) => {
  switch (true) {
    case days === 0:
      return "white";
    case days === 1 || days === 2:
      return "green";
    case days === 3 || days === 4:
      return "yellow";
    default:
      return "red";
  }
};

const User = ({ user }) => {
  return (
    <div
      style={{ backgroundColor: user.role.color }}
      className={`bg-gray-med w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 md:m-1 border-gray-border rounded-full flex items-center justify-center`}
    >
      <p className="text-white font-bold text-xs">
        {user.username.toUpperCase()}
      </p>
    </div>
  );
};

const Pair = ({ pair }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg flex m-2">
      <div
        className={`bg-${tagColor(pair.streak)} w-2 rounded-lg rounded-r-none`}
      ></div>
      <div>
        <div className="flex my-2 flex-wrap">
          {pair.teamMembers.map((user, i) => (
            <User key={i} user={user} />
          ))}
        </div>
        <p className="text-xs flex items-center m-2">Day {pair.streak}</p>
      </div>
    </div>
  );
};

const Day = ({ data }) => {
  const today = new Date();
  const { day, weekday, pairs } = data;
  const dayClasses =
    today.getDate() === parseInt(day)
      ? "font-bold"
      : "border-gray-border border-r-2 opacity-75";
  return (
    <div className={dayClasses}>
      <div className="text-center mb-8">
        <p className="text-3xl md:text-4xl -mb-3">{parseInt(day)}</p>
        <p className="text-1xl md:text-2xl">{weekday}</p>
      </div>
      {pairs.map((pair, i) => (
        <Pair key={i} pair={pair} />
      ))}
    </div>
  );
};

const DateRange = ({ history }) => {
  if (history.length === 0) {
    return null;
  }
  const startDay = history[0].day;
  const startMonth = history[0].month;
  const endDay = history[history.length - 1].day;
  const endMonth = history[history.length - 1].month;
  return (
    <p className="font-normal text-teal-dark text-xl">{`${startMonth} ${startDay} - ${endMonth} ${endDay}`}</p>
  );
};

const PairHistory = () => {
  const { teamId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/team/${teamId}/pairing_sessions/weekly`)
      .then((response) => {
        setHistory(response.data);
      });
  }, [setHistory, teamId]);

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline mb-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-2xl font-bold">Pair History</p>
            <DateRange history={history} />
          </div>
        </header>
        <div className="grid grid-cols-5">
          {history.map((day, i) => (
            <Day key={i} data={day} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PairHistory;
