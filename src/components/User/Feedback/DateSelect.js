import React from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "../../../constants/defaultStaticRanges";

const localDate = (date) => (date ? date.toLocaleDateString("en-US") : "");
const spanOfDays = (d1, d2) => localDate(d1) !== localDate(d2);

const DateSelect = ({ startDate, endDate, setStartDate, setEndDate }) => {
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
    <div>
      <p className="flex justify-center items-center font-bold text-center text-lg my-2">
        Filtering Dates <span className="ml-2">{localDate(startDate)}</span>
        {spanOfDays(startDate, endDate) && <span>-{localDate(endDate)}</span>}
      </p>
      <div className="flex justify-center">
        <DateRangePicker
          ranges={[selectionRange]}
          rangeColors={["#08697A"]}
          onChange={handleDateSelect}
          staticRanges={defaultStaticRanges}
        />
      </div>
    </div>
  );
};

export default DateSelect;
