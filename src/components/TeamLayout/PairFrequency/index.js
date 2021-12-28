import React, { useState, useContext } from "react";
import FrequencyTable from "./FrequencyTable";
import PairamidTable from "./PairamidTable";
import StandardTable from "./StandardTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { format, subDays } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "../../../constants/defaultStaticRanges";
import { TeamContext } from "../TeamContext";

const TABLE_VIEWS = {
  Pairamid: PairamidTable,
  Standard: StandardTable,
};

const PAIR_MORE =
  "Focused person has paired with the compared person less than half as much as their average possible pairs.";
const PAIR_LESS =
  "Focused person has paired with the compared person more than twice as much as their average possible pairs.";
const JUST_RIGHT =
  "Focused person has paired wth the compared person within range of their average possible pairs.";
const SOLO = "Number of times the focused person has worked solo.";

const PairFrequency = () => {
  const { team } = useContext(TeamContext);
  console.log("freq team: ", team);

  const [selectedTable, setSelectedTable] = useState("Pairamid");
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const [startDate, setStartDate] = useState(subDays(today, 30));
  const [endDate, setEndDate] = useState(today);

  const handleDateSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <main className="bg-gray-light min-h-screen col-span-7 p-2 lg:p-12">
      <section>
        <header className="border-b-2 border-gray-border items-baseline mb-4">
          <div className="md:flex md:flex-wrap justify-between ">
            <div className="flex items-center">
              <p className="text-2xl font-bold">Pair Frequency</p>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <h2 className="mr-2 md:mx-2">
                {format(startDate, "MM/dd/yyyy")}-
                {format(endDate, "MM/dd/yyyy")}
              </h2>
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </div>
          <div
            className={
              showCalendar ? "hidden sm:flex justify-center my-4" : "hidden"
            }
          >
            <DateRangePicker
              ranges={[selectionRange]}
              maxDate={today}
              rangeColors={["#08697A"]}
              onChange={handleDateSelect}
              staticRanges={defaultStaticRanges}
            />
          </div>
          <div
            className={
              showCalendar ? "sm:hidden flex justify-center my-4" : "hidden"
            }
          >
            <DateRange
              ranges={[selectionRange]}
              maxDate={today}
              rangeColors={["#08697A"]}
              onChange={handleDateSelect}
            />
          </div>
        </header>
        <div className="">
          <div className="my-4 md:justify-between md:flex">
            <div>
              <p className="text-xl font-bold text-center">Chart Type</p>
              <div className="flex items-center space-x-4">
                {Object.keys(TABLE_VIEWS).map((name) => (
                  <div
                    className={`border px-4 py-2 border-gray-border rounded-lg ${
                      name == selectedTable
                        ? "bg-green-icon text-white"
                        : "hover:border-green-icon"
                    } `}
                    key={name}
                    onClick={() => setSelectedTable(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xl font-bold text-center mr-2">Legend</p>
              <div className="grid grid-cols-4 text-center">
                <div title={PAIR_MORE} className="bg-yellow p-2">
                  Pair More
                </div>
                <div title={JUST_RIGHT} className="bg-green p-2">
                  Just Right
                </div>
                <div title={PAIR_LESS} className="bg-red p-2">
                  Pair Less
                </div>
                <div title={SOLO} className="bg-gray-med p-2">
                  Solo
                </div>
              </div>
            </div>
          </div>
          <FrequencyTable
            startDate={startDate}
            endDate={endDate}
            roles={team.roles}
            TableComponent={TABLE_VIEWS[selectedTable]}
          />
        </div>
      </section>
    </main>
  );
};

export default PairFrequency;
