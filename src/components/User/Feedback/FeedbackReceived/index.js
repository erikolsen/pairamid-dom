import React, { useState } from "react";
import _ from "lodash";
import RadarChartRecharts from "../../../charts/RadarChart";
import SimpleScatterChart from "../../../charts/BubbleChart";
import PositiveNegativeBar from "../../../charts/PositiveNegativeBar";
import TagGroups from "../TagGroups";
import { subYears } from "date-fns";
import ManageTags from "../ManageTags";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import defaultStaticRanges from "../../../../constants/defaultStaticRanges";

import { getCount } from "../../../../util/getCount";
import useToggle from "../../../../util/useToggle";
import DisplayCard from "./DisplayCard";

const hasGlowsAndGrowsTags = (user) =>
  user.feedback_tag_groups.some((g) => g.name === "Glows/Grows");

const FilterButton = ({ name, onClick, active }) => (
  <button
    onClick={onClick}
    className={`ml-2 flex items-center border border-gray-border rounded-lg px-4 py-2 focus:outline-none hover:border-green-icon ${
      active && "bg-green-icon text-white"
    }`}
  >
    <p className="text-sm">{name}</p>
  </button>
);

const useDateRangeSelector = (defaultStart, defaultEnd) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(defaultStart || today);
  const [endDate, setEndDate] = useState(defaultEnd || today);

  const setSelectedRange = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectedRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const dateFilter = (feedback) =>
    new Date(feedback.created_at) >= startDate &&
    new Date(feedback.created_at) <= endDate;

  return [selectedRange, setSelectedRange, dateFilter];
};

const FeedbackReceived = ({
  user,
  updateFeedback,
  deleteFeedback,
  duplicateFeedback,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedRange, setSelectedRange, dateFilter] = useDateRangeSelector(
    subYears(tomorrow, 1),
    tomorrow
  );

  const [tags, setTags] = useState([]);

  const [showFilters, toggleFilters] = useToggle(false);
  const [showTags, toggleTags] = useToggle(false);
  const [showCharts, toggleCharts] = useToggle(false);

  if (!user) return null;

  const tagUnion = (fb) =>
    _.difference(
      tags.map((t) => t.id),
      fb.tags.map((t) => t.id)
    ).length === 0;

  const filteredFeedback = user.feedback_received
    .filter(tagUnion)
    .filter(dateFilter);

  const feedbackTags = filteredFeedback.flatMap((feedback) =>
    feedback.tags.map((tag) => tag.name)
  );
  const tagCounts = feedbackTags.reduce(getCount, {});

  return (
    <main className="bg-gray-lightcol-span-7 h-full">
      <section>
        <div className="md:flex md:justify-between md:items-center">
          <h2 className="my-2">Feedback</h2>
          <div className="flex my-2">
            <FilterButton
              name="Manage Tags"
              onClick={toggleTags}
              active={showTags}
            />
            <FilterButton
              name="Filters"
              onClick={toggleFilters}
              active={showFilters}
            />
            <FilterButton
              name="Charts"
              onClick={toggleCharts}
              active={showCharts}
            />
          </div>
        </div>

        {showTags && (
          <div className={`my-4`}>
            <ManageTags
              user={user}
              feedback_tag_groups={user.feedback_tag_groups}
            />
          </div>
        )}

        {showFilters && (
          <div className={`grid grid-cols-3 gap-x-4 gap-y-4`}>
            <div className="col-span-3 md:col-span-1 bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-center my-2">Filter by Tag</h2>
              <TagGroups
                groups={user.feedback_tag_groups}
                tags={tags}
                setTags={setTags}
                tagCounts={tagCounts}
              />
            </div>
            <div className="col-span-3 md:col-span-2 bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-center">
                <DateRangePicker
                  ranges={[selectedRange]}
                  maxDate={today}
                  rangeColors={["#08697A"]}
                  onChange={setSelectedRange}
                  staticRanges={defaultStaticRanges}
                />
              </div>
            </div>
            <div className="col-span-3 border-b-2 border-gray-border mt-2 mb-4" />
          </div>
        )}

        {showCharts && (
          <div className={`my-4`}>
            <div className="bg-white rounded-lg shadow-lg">
              {hasGlowsAndGrowsTags(user) ? (
                <>
                  <h2 className="text-center pt-4">Glows and Grows</h2>
                  <PositiveNegativeBar
                    filteredFeedback={filteredFeedback}
                    feedbackTagGroups={user.feedback_tag_groups}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-center pt-4">Tag Radar</h2>
                  <RadarChartRecharts tagCounts={tagCounts} />
                </>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg my-4">
              <h2 className="text-center pt-4">Tags By Date</h2>
              <SimpleScatterChart filteredFeedback={filteredFeedback} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFeedback.map((feedback) => (
            <DisplayCard
              key={feedback.id}
              feedback={feedback}
              groups={user.feedback_tag_groups}
              updateFeedback={updateFeedback}
              deleteFeedback={deleteFeedback}
              duplicateFeedback={duplicateFeedback}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeedbackReceived;
