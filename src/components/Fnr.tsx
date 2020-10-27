import React from "react";
import {FnrInput} from "nav-frontend-skjema";

interface FnrProps {
  label: string
  nr?: string
  feilmelding?: string,
  placeholder: string
  onChange: (fnr: string) => void
  onValidate: (valid: boolean) => void
}

const Fnr = (props: FnrProps) => {
  const setValid = (valid) => {
    props.onValidate(valid);
  }
  return (
    <FnrInput value={props.nr} placeholder={props.placeholder} label={props.label}
              onValidate={(val) => setValid(val)}
              onChange={(evt) => {props.onChange(evt.target.value)}} feil={props.feilmelding}/>
  );
}

export default Fnr;
