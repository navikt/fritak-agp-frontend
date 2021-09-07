export interface fravaer {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

const formatFravaersdager = (maanedsfravaer: Array<fravaer>) => {
  const aarsfravaer: number[] = [];
  const years: string[] = [];

  maanedsfravaer.forEach((currentMonth) => {
    let currentYear: string = '';
    if (!!currentMonth && !!currentMonth.yearMonth) {
      currentYear = currentMonth.yearMonth.split('-')[0];
    }
    if (!aarsfravaer[currentYear]) {
      aarsfravaer[currentYear] = 0;
    }
    aarsfravaer[currentYear] += currentMonth.antallDagerMedFravaer;
    if (years.indexOf(currentYear) === -1) {
      years.push(currentYear);
    }
  });
  const sumup = years
    .sort()
    .map((year) => `${year}: ${aarsfravaer[year]} dager`)
    .join(', ');

  return `Fraværsdager ${sumup}`;
};

export default formatFravaersdager;
