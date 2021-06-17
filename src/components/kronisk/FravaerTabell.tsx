import React from 'react';
import './FravaerTabell.sass';
import { lastThreeYears } from '../../utils/lastThreeYears';
import { MONTHS } from '../../utils/months';
import { Aarsfravaer } from './Aarsfravaer';
import { FravaerRow } from './FravaerRow';
import { useTranslation } from 'react-i18next';
import { FravaerTabellKeys } from './FravaerTabellKeys';

interface DagerTabellProps {
  years?: number[];
  onChange: any;
  validated: boolean;
  fravaer?: Array<Aarsfravaer>;
}

const FravaerTabell = (props: DagerTabellProps) => {
  const { t } = useTranslation();
  const years: number[] = props.years || lastThreeYears();
  const thisYear = years[years.length - 1];
  const thisMonth = new Date().getMonth();
  return (
    <table className='tabell tabell--stripet tabell--border fravaer-tabell'>
      <thead>
        <tr key={'years-header'}>
          {years.map((year) => (
            <th key={'fravaer_year-' + year} colSpan={2}>
              {year}
            </th>
          ))}
        </tr>
        <tr key={'months-header'}>
          {years.map((year) => (
            <React.Fragment key={'month_header' + year}>
              <th>{t(FravaerTabellKeys.FRAVAERTABELL_MONTH)}</th>
              <th>{t(FravaerTabellKeys.FRAVAERTABELL_DAYS)}</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {MONTHS.map((month) => (
          <tr key={month}>
            {years.map((year) => (
              <FravaerRow
                key={'FravaerRow-' + year + '-' + month}
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
