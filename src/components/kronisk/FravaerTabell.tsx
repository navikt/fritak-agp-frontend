import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './FravaerTabell.sass';
import { lastThreeYears } from '../../utils/lastThreeYears';
import { MONTHS } from '../../utils/months';
import { isFuture } from '../../utils/isFuture';
import { FravaerType } from './Actions';
import { Aarsfravaer } from './Aarsfravaer';
import { getFravaerByMonth } from './getFravaerByMonth';

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
            {years.map((year) => {
              if (!isFuture(year, month, thisYear, thisMonth)) {
                return (
                  <>
                    <td>{month.substr(0, 3)}</td>
                    <td>
                      <Input
                        label={month + ' ' + year}
                        id={month + '-' + year}
                        value={getFravaerByMonth(
                          year,
                          MONTHS.indexOf(month),
                          props.fravaer
                        )}
                        onChange={(event) => {
                          props.onChange({
                            year: year,
                            month: MONTHS.indexOf(month),
                            dager: event.currentTarget.value
                          } as FravaerType);
                        }}
                      />
                    </td>
                  </>
                );
              } else {
                return (
                  <>
                    <td className='empty-month' />
                    <td className='empty-month' />
                  </>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FravaerTabell;
