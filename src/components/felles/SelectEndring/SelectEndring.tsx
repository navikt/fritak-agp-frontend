import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import EndringsAarsak from '../../gravidkrav/EndringsAarsak';

interface SelectEndringProps {
  onChange?: any;
  feil?: string;
}

export default function SelectEndring(props: SelectEndringProps) {
  return (
    <Select
      id='select-endring-dropdown'
      label={<Systemtittel>Årsak til endring</Systemtittel>}
      onChange={props.onChange}
      feil={props.feil}
    >
      <option value=''>Velg årsak</option>
      <option value={EndringsAarsak.TARIFFENDRING}>Tariffendring</option>
      <option value={EndringsAarsak.ANNET}>Annet</option>
    </Select>
  );
}
