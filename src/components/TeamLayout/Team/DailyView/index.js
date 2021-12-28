import React, { useState, useEffect } from "react";
import PairGrid from "./PairGrid";
import DailyPairList from "./DailyPairList";
import DailyReminderList from "./DailyReminderList";
import DailyPairHeader from "./DailyPairHeader";
import _ from "lodash";
import { SOCKET } from "../SocketHandler";
import { useParams } from "react-router-dom";

const DailyView = ({ pairs, setPairs }) => {
  const { teamId } = useParams();
  const [saved, setSaved] = useState(true);
  const [error, setError] = useState("");
  console.log("Daily view render");

  useEffect(() => {
    SOCKET.emit("join", { room: teamId });
    SOCKET.on("server error", (e) => {
      setError(e.message);
    });
    SOCKET.on("add pair", (pair) => {
      setPairs([...pairs, pair]);
    });
    SOCKET.on("delete pair", (uuid) => {
      setPairs(pairs.filter((p) => p.uuid !== uuid));
    });
    SOCKET.on("batch update pairs", (response) => {
      let dupPairs = _.cloneDeep(pairs);
      response.forEach((data) => {
        dupPairs.splice(data.index, 1, data.pair);
      });
      setPairs(dupPairs);
      setSaved(true);
    });

    return () => {
      SOCKET.emit("leave", { room: teamId });
      SOCKET.off("server error");
      SOCKET.off("add pair");
      SOCKET.off("delete pair");
      SOCKET.off("batch update pairs");
    };
  }, [pairs, setPairs, teamId]);

  return (
    <main className="bg-gray-light col-span-7 p-12 h-full">
      <section>
        <DailyPairHeader saved={saved} error={error} />
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          <PairGrid pairs={pairs} setSaved={setSaved} setError={setError} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyReminderList />
          <DailyPairList pairs={pairs} />
        </div>
      </section>
    </main>
  );
};

export default DailyView;
