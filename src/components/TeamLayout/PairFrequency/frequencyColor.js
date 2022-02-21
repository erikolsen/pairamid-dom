export const GREEN = "bg-green";
export const RED = "bg-red";
export const YELLOW = "bg-yellow";
export const GRAY = "bg-gray-med";

export const frequencyColor = (target, value, relevantTeamMembers, solo) => {
  const total = relevantTeamMembers.reduce(
    (memo, member) => (memo += target.frequencies[member] || 0),
    0
  );
  const average = total / relevantTeamMembers.length || 1;

  if (solo) return GRAY;
  if (!value || value < average / 2) return YELLOW;
  if (value > 1 && value > average * 2) return RED;
  return GREEN;
};
