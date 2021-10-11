export const GREEN = "bg-green";
export const RED = "bg-red";
export const YELLOW = "bg-yellow";
export const GRAY = "bg-gray-med";

export const frequencyColor = (target, value, relevantUsers, solo) => {
  const total = relevantUsers.reduce(
    (memo, user) => (memo += target.frequencies[user]),
    0
  );
  const average = total / relevantUsers.length || 1;

  if (solo) return GRAY;
  if (!value || value <= average / 2) return YELLOW;
  if (value > 1 && value >= average * 2) return RED;
  return GREEN;
};
