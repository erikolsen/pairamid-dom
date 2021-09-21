import React from "react";
import _ from "lodash";
import {
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const formatData = (filteredFeedback, feedbackTagGroups) => {
  const feedbackTags = filteredFeedback.flatMap((feedback) =>
    feedback.tags.map((tag) => tag.name)
  );
  const GLOWS_AND_GROWS_GROUP = feedbackTagGroups.filter(
    (group) => group.name === "Glows/Grows"
  )[0];
  const filterGroup = (group) => (tag) =>
    !group.tags.map((t) => t.name).includes(tag);
  const byName = (name) => (fb) => fb.tags.map((t) => t.name).includes(name);

  return _.uniq(feedbackTags.filter(filterGroup(GLOWS_AND_GROWS_GROUP))).map(
    (tagName) => ({
      name: tagName,
      glow: filteredFeedback.filter(byName("Glow")).filter(byName(tagName))
        .length,
      grow: filteredFeedback.filter(byName("Grow")).filter(byName(tagName))
        .length,
    })
  );
};

const PositiveNegativeBar = ({ filteredFeedback, feedbackTagGroups }) => {
  if (filteredFeedback.length === 0) return null;
  const data = formatData(filteredFeedback, feedbackTagGroups);

  const minRowHeight = 200;
  const pixelHeightBase = 50;
  const pixelLengthBase = 7;
  const longestLabel = Math.max(...data.map((d) => d.name.length));
  const rows = data.length || 1;
  const nonBreakingWhiteSpace = (val) => val && val.replace(/ /g, "\u00a0");
  const containerHight = Math.max(...[minRowHeight, rows * pixelHeightBase]);

  return (
    <ResponsiveContainer width="100%" height={containerHight}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: pixelLengthBase * longestLabel,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          tickFormatter={nonBreakingWhiteSpace}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="glow" fill="#F67C01" stackId="a" />
        <Bar dataKey="grow" fill="#1870CB" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PositiveNegativeBar;
