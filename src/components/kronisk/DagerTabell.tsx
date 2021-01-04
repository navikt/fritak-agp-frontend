import React from 'react';
import { Input } from 'nav-frontend-skjema';
import './DagerTabell.sass';

const months: string[] = [
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

interface DagerTabellProps {
  years?: number[];
  onChange: any;
}

const lastFourYears = (year: number = new Date().getFullYear()) => {
  return [-3, -2, -1, 0].map((n) => year + n);
};

const DagerTabell = (props: DagerTabellProps) => {
  const years: number[] = props.years || lastFourYears();
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
        {months.map((month) => (
          <tr key={month}>
            {years.map((year) => (
              <>
                <td>{month.substr(0, 3)}</td>
                <td>
                  <Input
                    label={month + ' ' + year}
                    defaultValue=''
                    placeholder=''
                    onChange={(event) => {
                      props.onChange({
                        year: year,
                        month: months.indexOf(month),
                        day:
                          event.target.value == ''
                            ? undefined
                            : parseInt(event.target.value)
                      });
                    }}
                  />
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DagerTabell;
