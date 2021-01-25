export const lastThreeYears = (year: number = new Date().getFullYear()) => {
  return [-3, -2, -1, 0].map((n) => year + n);
};
