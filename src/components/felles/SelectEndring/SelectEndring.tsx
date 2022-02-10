import { Select } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';

interface SelectEndringProps {
  onChange?: any;
}

export default function SelectEndring(props: SelectEndringProps) {
  return (
    <Select label={<Systemtittel>Årsak til endring</Systemtittel>} onChange={props.onChange}>
      <option value=''>Velg årsak</option>
      <option value='tarrifendring'>Tariffendring</option>
      <option value='annet'>Annet</option>
    </Select>
  );
}
