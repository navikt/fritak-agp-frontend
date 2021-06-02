import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Lenke from 'nav-frontend-lenker';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';

interface OrgnrProps {
  label: string;
  orgnr?: string;
  feilmelding?: string;
  placeholder: string;
  onChange: (fnr: string) => void;
}

const Orgnr = (props: OrgnrProps) => {
  const { t } = useTranslation();

  return (
    <Input
      value={props.orgnr}
      placeholder={props.placeholder}
      id='arbeidsgiverFeilmeldingId'
      label={
        <div style={{ display: 'flex' }}>
          {props.label}
          <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
            {t(LangKey.ORGNR_HJELPETEKST)}
            <br />
            <Lenke href='https://www.altinn.no/starte-og-drive/starte/registrering/organisasjonsnummer-virksomhetsnummer/'>
              {t(LangKey.ORGNR_LENKE)}
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
