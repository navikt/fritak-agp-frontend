import { Aarsfravaer } from './Aarsfravaer';
import { getFravaerByMonth } from './getFravaerByMonth';
import { validerFravaerMaaned } from './validerFravaerMaaned';
import { FravaerType } from './Actions';
import React, { useState } from 'react';
import MONTHS from '../../utils/months';
import { TextField } from '@navikt/ds-react';

export interface FravaerInputProps {
  month: number;
  year: number;
  onChange: any;
  fravaer?: Array<Aarsfravaer>;
}

export const FravaerInput = (props: FravaerInputProps) => {
  const dager = getFravaerByMonth(props.year, props.month, props.fravaer);
  const feilOppsummering = validerFravaerMaaned(props.year, props.month, dager);
  const [lokalFeil, setLokalFeil] = useState<string>('');
  const feil = feilOppsummering?.feilmelding || lokalFeil;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(/^[0-9,.]*$/)) {
      setLokalFeil('Dager må være et tall');
    } else {
      setLokalFeil('');
    }

    props.onChange({
      year: props.year,
      month: props.month,
      dager: event.currentTarget.value
    } as FravaerType);
  };

  return (
    <TextField
      label={MONTHS[props.month] + ' ' + props.year}
      id={'fim' + props.month + 'fiy' + props.year}
      error={feil}
      onChange={changeHandler}
      hideLabel
    />
  );
};
