import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { format, subDays } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "../../../constants/defaultStaticRanges";

const useDateRangePicker = () => {
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

  const CalendarToggle = () => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setShowCalendar(!showCalendar)}
    >
      <h2 className="mr-2 md:mx-2">
        {format(startDate, "MM/dd/yyyy")}-{format(endDate, "MM/dd/yyyy")}
      </h2>
      <FontAwesomeIcon icon={faPencilAlt} />
    </div>
  );

  const CalendarZone = () => (
    <>
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
    </>
  );
  return [CalendarToggle, CalendarZone, startDate, endDate];
};

export default useDateRangePicker;
