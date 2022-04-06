import React from 'react';
import { useTranslation } from 'react-i18next';
import { KroniskSideKeys } from '../../../kronisk/KroniskSideKeys';

export interface MaanedsFravaer {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

interface FravaersdagerProps {
  maanedsfravaer?: Array<MaanedsFravaer>;
}

const Fravaersdager = ({ maanedsfravaer }: FravaersdagerProps) => {
  const { t } = useTranslation();
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

  if (sortedYears.length === 0) {
    return <span>{t(KroniskSideKeys.KRONISK_SIDE_PERIODER_UNNTAK)}</span>;
  }

  return <span>Fraværsdager {sumup}</span>;
};

export default Fravaersdager;
