import React from 'react';
import EndringsAarsak from '../../gravidkrav/EndringsAarsak';
import { Heading, Select } from '@navikt/ds-react';

interface SelectEndringProps {
  onChange?: any;
  feil?: string;
}

export default function SelectEndring(props: SelectEndringProps) {
  return (
    <Select
      id='select-endring-dropdown'
      label={
        <Heading size='medium' level='3'>
          Årsak til endring
        </Heading>
      }
      onChange={props.onChange}
      error={props.feil}
    >
      <option value=''>Velg årsak</option>
      <option value={EndringsAarsak.TARIFFENDRING}>Tariffendring</option>
      <option value={EndringsAarsak.ANNET}>Annet</option>
    </Select>
  );
}
