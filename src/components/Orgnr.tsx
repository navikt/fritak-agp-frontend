import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Lenke from 'nav-frontend-lenker';

interface OrgnrProps {
  label: string;
  orgnr?: string;
  feilmelding?: string;
  placeholder: string;
  onChange: (fnr: string) => void;
}

const Orgnr = (props: OrgnrProps) => {
  return (
    <Input
      value={props.orgnr}
      placeholder={props.placeholder}
      id='arbeidsgiverFeilmeldingId'
      label={
        <div style={{ display: 'flex' }}>
          {props.label}
          <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
            Vi spør etter virksomhetsnummer, ikke organisasjonsnummer. <br />
            <Lenke href='https://www.altinn.no/starte-og-drive/starte/registrering/organisasjonsnummer-virksomhetsnummer/'>
              Se hva som er forskjellen
            </Lenke>
          </Hjelpetekst>
        </div>
      }
      onChange={(evt) => props.onChange(evt.target.value)}
      feil={props.feilmelding}
    />
  );
};

export default Orgnr;
