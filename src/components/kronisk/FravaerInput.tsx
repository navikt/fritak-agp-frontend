import { Aarsfravaer } from './Aarsfravaer';
import { getFravaerByMonth } from './getFravaerByMonth';
import { validerFravaerMaaned } from './validerFravaerMaaned';
import { Input } from 'nav-frontend-skjema';
import { FravaerType } from './Actions';
import React from 'react';

export interface FravaerInputProps {
  month: number;
  year: number;
  onChange: any;
  fravaer?: Array<Aarsfravaer>;
}

export const FravaerInput = (props: FravaerInputProps) => {
  const dager = getFravaerByMonth(props.year, props.month, props.fravaer);
  const feilOppsummering = validerFravaerMaaned(props.year, props.month, dager);
  const feil = feilOppsummering?.feilmelding || '';
  return (
    <Input
      label={props.month + ' ' + props.year}
      id={props.month + '-' + props.year}
      feil={feil}
      value={dager}
      autoComplete='false'
      autoCorrect='false'
      onChange={(event) => {
        props.onChange({
          year: props.year,
          month: props.month,
          dager: event.currentTarget.value
        } as FravaerType);
      }}
    />
  );
};
