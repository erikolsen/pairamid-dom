import _ from "lodash";

export const frequencyColor = (target, value, allUsers) => {
  const total = _.sum(
    allUsers.map((user) => target.frequencies[user.username])
  );
  const average = Math.round(total / allUsers.length || 1);
  if (!value || value < Math.round(average / 2)) {
    return "bg-yellow";
  }
  if (value > Math.round(average * 2)) {
    return "bg-red";
  }
  return "bg-green";
};
