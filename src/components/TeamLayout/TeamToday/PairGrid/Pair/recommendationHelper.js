const largestValue = (obj) =>
  Object.entries(obj)
    .sort((a, b) => a[1] - b[1])
    .map((value) => value[0])
    .slice(-1)[0];

export const roleMapping = (frequency) => {
  return frequency.reduce(
    (acc, data) => ({ ...acc, [data.username]: data.roleName }),
    {}
  );
};

export const mostPairedWithRole = (userData, roles) => {
  const roleCounts = Object.entries(userData.frequencies)
    .sort((a, b) => a[1] - b[1])
    .map(([name, count]) => [roles[name], count])
    .reduce(
      (acc, [name, count]) => ({
        ...acc,
        [name]: (acc[name] || 0) + count,
      }),
      {}
    );
  return largestValue(roleCounts);
};

export const leastPairedWith = (user, frequency, excluded, returnCount) => {
  const RETURN_COUNT = returnCount || 2;
  const userData = frequency.find((ud) => ud.username === user.username);
  const roles = roleMapping(frequency);
  const keyRole = mostPairedWithRole(userData, roles);

  return Object.entries(userData.frequencies)
    .filter(([username, _]) => keyRole === roles[username])
    .sort((a, b) => a[1] - b[1])
    .map((data) => data[0])
    .filter((u) => ![...excluded, userData.username].includes(u))
    .slice(0, RETURN_COUNT);
};
