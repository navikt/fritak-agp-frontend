export const isFuture = (
  year: number,
  month: number,
  thisYear: number,
  thisMonth: number
) => {
  if (month == -1) {
    throw Error('Invalid month!');
  }
  if (thisYear > year) {
    return false;
  }
  return thisMonth < month;
};
