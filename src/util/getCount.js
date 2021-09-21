export const getCount = (acc, el) => {
  acc[el] = acc[el] + 1 || 1;
  return acc;
};
