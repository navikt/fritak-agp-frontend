import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import { Normaltekst } from 'nav-frontend-typografi';

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
            <Normaltekst>{t(LangKey.ORGNR_HJELPETEKST)}</Normaltekst>
          </Hjelpetekst>
        </div>
      }
      onChange={(evt) => props.onChange(evt.target.value)}
      feil={props.feilmelding}
    />
  );
};

export default Orgnr;
