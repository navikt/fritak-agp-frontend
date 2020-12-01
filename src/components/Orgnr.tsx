import React from 'react';
import { FnrInput } from 'nav-frontend-skjema';

interface OrgnrProps {
  label: string;
  orgnr?: string;
  feilmelding?: string;
  placeholder: string;
  onChange: (fnr: string) => void;
  onValidate: (valid: boolean) => void;
}

const Orgnr = (props: OrgnrProps) => {
  const setValid = (valid) => {
    props.onValidate(valid);
  };
  return (
    <FnrInput
      value={props.orgnr}
      placeholder={props.placeholder}
      label={props.label}
      onValidate={(val) => setValid(val)}
      onChange={(evt) => {
        props.onChange(evt.target.value);
      }}
      feil={props.feilmelding}
    />
  );
};

export default Orgnr;
