import React from 'react';
import { Input } from 'nav-frontend-skjema';

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
    <Input
      value={props.orgnr}
      placeholder={props.placeholder}
      label={props.label}
      onChange={(evt) => {
        props.onChange(evt.target.value);
        setValid(evt.target.value);
      }}
      feil={props.feilmelding}
    />
  );
};

export default Orgnr;
