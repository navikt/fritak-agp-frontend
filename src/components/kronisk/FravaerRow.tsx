import { Aarsfravaer } from './Aarsfravaer';
import { isFuture } from '../../utils/isFuture';
import { FravaerInput } from './FravaerInput';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { FravaerTabellKeys } from './FravaerTabellKeys';

interface FravaerRowProps {
  month: number;
  year: number;
  thisMonth: number;
  thisYear: number;
  fravaer?: Array<Aarsfravaer>;
  onChange: any;
}
const inThePast = (year: number, month: number, thisYear: number, thisMonth: number): boolean => {
  if (year === thisYear - 2 && month < thisMonth) return true;

  return false;
};

export const FravaerRow = (props: FravaerRowProps) => {
  const { t } = useTranslation();
  if (
    !isFuture(props.year, props.month, props.thisYear, props.thisMonth) &&
    !inThePast(props.year, props.month, props.thisYear, props.thisMonth)
  ) {
    return (
      <>
        <td>
          <abbr title={oversettLangMaaned(t, props.month)}>{oversettKortMaaned(t, props.month)}</abbr>
        </td>
        <td>
          <FravaerInput onChange={props.onChange} month={props.month} year={props.year} fravaer={props.fravaer} />
        </td>
      </>
    );
  } else {
    return (
      <>
        <td data-testid='empty-month' className='empty-month' />
        <td className='empty-month' />
      </>
    );
  }
};

function oversettKortMaaned(t: TFunction, month: number): string {
  return oversettLangMaaned(t, month).substring(0, 3);
}

function oversettLangMaaned(t: TFunction, month: number): string {
  return t(FravaerTabellKeys['FRAVAERTABELL_MONTH_' + (month + 1)]);
}
