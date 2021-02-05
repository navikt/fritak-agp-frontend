import { Aarsfravaer } from './Aarsfravaer';
import { isFuture } from '../../utils/isFuture';
import { MONTHS } from '../../utils/months';
import { FravaerInput } from './FravaerInput';
import React from 'react';

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
  if (
    !isFuture(props.year, props.month, props.thisYear, props.thisMonth) &&
    !inThePast(props.year, props.month, props.thisYear, props.thisMonth)
  ) {
    return (
      <>
        <td>{MONTHS[props.month].substr(0, 3)}</td>
        <td>
          <FravaerInput onChange={props.onChange} month={props.month} year={props.year} fravaer={props.fravaer} />
        </td>
      </>
    );
  } else {
    return (
      <>
        <td data-testId='empty-month' className='empty-month' />
        <td className='empty-month' />
      </>
    );
  }
};

export default FravaerRow;
