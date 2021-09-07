export interface MaanedsFravaer {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

const formatFravaersdager = (maanedsfravaer: Array<MaanedsFravaer>) => {
  const aarsfravaer: number[] = [];
  const years: number[] = [];

  maanedsfravaer.forEach((currentMonth) => {
    let currentYear: number = 0;
    if (!!currentMonth && !!currentMonth.yearMonth) {
      const currentYearText = currentMonth.yearMonth.split('-')[0];
      currentYear = Number(currentYearText);
    }
    if (!aarsfravaer[currentYear]) {
      aarsfravaer[currentYear] = 0;
    }
    aarsfravaer[currentYear] += currentMonth.antallDagerMedFravaer;
    if (years.indexOf(currentYear) === -1) {
      years.push(currentYear);
    }
  });

  const sortedYears = [...years].sort();
  const sumup = sortedYears.map((year) => `${year}: ${aarsfravaer[year]} dager`).join(', ');

  return `Fraværsdager ${sumup}`;
};

export default formatFravaersdager;
