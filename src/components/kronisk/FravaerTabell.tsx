import React from 'react';
import './FravaerTabell.sass';
import { lastThreeYears } from '../../utils/lastThreeYears';
import { MONTHS } from '../../utils/months';
import { Aarsfravaer } from './Aarsfravaer';
import { FravaerRow } from './FravaerRow';

interface DagerTabellProps {
  years?: number[];
  onChange: any;
  validated: boolean;
  fravaer?: Array<Aarsfravaer>;
}

const FravaerTabell = (props: DagerTabellProps) => {
  const years: number[] = props.years || lastThreeYears();
  const thisYear = years[years.length - 1];
  const thisMonth = new Date().getMonth();
  return (
    <table className='tabell tabell--stripet tabell--border fravaer-tabell'>
      <thead>
        <tr key={'years-header'}>
          {years.map((year) => (
            <th key={year} colSpan={2}>
              {year}
            </th>
          ))}
        </tr>
        <tr key={'months-header'}>
          {years.map((year) => (
            <>
              <th key={'month-' + year}>Måned</th>
              <th key={'days-' + year}>Dager</th>
            </>
          ))}
        </tr>
      </thead>
      <tbody>
        {MONTHS.map((month) => (
          <tr key={month}>
            {years.map((year) => (
              <FravaerRow
                key={'input' + year + '' + month}
                year={year}
                month={MONTHS.indexOf(month)}
                thisMonth={thisMonth}
                thisYear={thisYear}
                fravaer={props.fravaer}
                onChange={props.onChange}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FravaerTabell;
