import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import RoleSelect from "./RoleSelect";
import FrequencyTable from "./FrequencyTable";
import { format, subDays } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "./defaultStaticRanges";

const PairFrequency = () => {
  const { teamId } = useParams();
  const [roles, setRoles] = useState([]);

  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();

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

  useEffect(() => {
    axios.get(`${API_URL}/team/${teamId}/roles`).then((response) => {
      setRoles(response.data);
    });
  }, []);

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border items-baseline mb-4">
          <div className="md:flex md:flex-wrap justify-between ">
            <div className="flex items-center">
              <p className="text-2xl font-bold">Pair Frequency</p>
            </div>
            <div>
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
        </header>
        <div className="">
          <div className="my-4 md:justify-between md:flex">
            <form>
              <p className="text-xl font-bold mb-2">Compare Roles</p>
              <div className="flex justify-between">
                <RoleSelect
                  label="X Axis"
                  roles={roles}
                  onSelect={setSecondary}
                  selected={secondary}
                />
                <RoleSelect
                  label="Y Axis"
                  roles={roles}
                  onSelect={setPrimary}
                  selected={primary}
                />
              </div>
            </form>
            <div>
              <p className="text-xl font-bold text-center">Legend</p>
              <div className="grid grid-cols-4 text-center">
                <div className="bg-yellow p-2">Pair More</div>
                <div className="bg-green p-2">Just Right</div>
                <div className="bg-red p-2">Pair Less</div>
                <div className="bg-gray-med p-2">Solo</div>
              </div>
            </div>
          </div>
          <FrequencyTable
            startDate={startDate}
            endDate={endDate}
            primary={primary}
            secondary={secondary}
          />
        </div>
      </section>
    </main>
  );
};

export default PairFrequency;
