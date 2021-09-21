import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "../../../constants/defaultStaticRanges";
import { subDays } from "date-fns";

// const DateSelect = ({ startDate, setStartDate, endDate, setEndDate }) => {
const DateSelect = () => {
  // console.log("startDate: ", startDate);
  // console.log("endDate: ", endDate);
  const today = new Date();
  const [startDate, setStartDate] = useState(subDays(today, 30));
  const [endDate, setEndDate] = useState(today);
  const handleDateSelect = (ranges) => {
    console.log("rranges: ", ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div>
      <div className="flex justify-center">
        <DateRangePicker
          ranges={[selectionRange]}
          maxDate={today}
          rangeColors={["#08697A"]}
          onChange={handleDateSelect}
          staticRanges={defaultStaticRanges}
        />
      </div>
    </div>
  );
};

export default DateSelect;
