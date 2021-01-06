import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './DagerTabell.sass';
import { lastFourYears } from '../../utils/lastFourYears';
import { MONTHS } from '../../utils/months';
import { isFuture } from '../../utils/isFuture';

interface DagerTabellProps {
  years?: number[];
  onChange: any;
  validated: boolean;
}

const DagerTabell = (props: DagerTabellProps) => {
  const years: number[] = props.years || lastFourYears();
  const thisYear = years[years.length - 1];
  const thisMonth = 2;
  return (
    <table className='tabell tabell--stripet tabell--border dager-tabell'>
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
                        defaultValue=''
                        id={month + '-' + year}
                        onChange={(event) => {
                          props.onChange({
                            year: year,
                            month: MONTHS.indexOf(month),
                            day:
                              event.target.value == ''
                                ? undefined
                                : parseInt(event.target.value)
                          });
                        }}
                      />
                    </td>
                  </>
                );
              } else {
                return (
                  <>
                    <td className='empty-month'></td>
                    <td className='empty-month'></td>
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

export default DagerTabell;
