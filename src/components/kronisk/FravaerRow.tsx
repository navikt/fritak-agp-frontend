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

export const FravaerRow = (props: FravaerRowProps) => {
  if (!isFuture(props.year, props.month, props.thisYear, props.thisMonth)) {
    return (
      <>
        <td>{MONTHS[props.month].substr(0, 3)}</td>
        <td>
          <FravaerInput
            onChange={props.onChange}
            month={props.month}
            year={props.year}
            fravaer={props.fravaer}
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
};
