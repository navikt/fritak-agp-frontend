import React from 'react';
import { TextField } from '@navikt/ds-react';

interface FnrProps {
  label: string;
  fnr?: string;
  id?: string;
  disabled?: boolean;
  feilmelding?: string;
  placeholder: string;
  className?: string;
  feilmeldingId?: string;
  onChange: (fnr: string) => void;
}

const Fnr = (props: FnrProps) => {
  return (
    <TextField
      className={props.className}
      value={props.fnr}
      placeholder={props.placeholder}
      id={props.id}
      disabled={props.disabled}
      label={props.label}
      onChange={(evt) => props.onChange(evt.target.value)}
      error={props.feilmelding}
      errorId={props.feilmeldingId}
    />
  );
};

export default Fnr;
