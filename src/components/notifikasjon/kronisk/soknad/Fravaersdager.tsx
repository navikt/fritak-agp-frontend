import React from 'react';

export interface MaanedsFravaer {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

interface FravaersdagerProps {
  maanedsfravaer?: Array<MaanedsFravaer>;
}

const Fravaersdager = ({ maanedsfravaer }: FravaersdagerProps) => {
  const aarsfravaer: number[] = [];
  const years: number[] = [];

  if (!maanedsfravaer) {
    return null;
  }

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

  const sortedYears = [...years].sort((a, b) => a - b);
  const sumup = sortedYears.map((year) => `${year}: ${aarsfravaer[year]} dager`).join(', ');

  return <span>Fraværsdager {sumup}</span>;
};

export default Fravaersdager;
