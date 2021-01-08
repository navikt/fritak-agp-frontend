export const isFuture = (
  year: number,
  month: number,
  thisYear: number,
  thisMonth: number
) => {
  if (month < 0 || month > 11) {
    throw new Error('Invalid month!');
  }
  if (thisYear > year) {
    return false;
  }
  return thisMonth < month;
};
