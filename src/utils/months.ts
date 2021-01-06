export const MONTHS: string[] = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember'
];

export const monthKey = (month: string) => {
  return month.substr(0, 3).toLowerCase();
};
