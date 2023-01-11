import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import { Normaltekst } from 'nav-frontend-typografi';
import './Orgnr.scss';

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
      defaultValue={props.orgnr}
      placeholder={props.placeholder}
      id='arbeidsgiverFeilmeldingId'
      label={
        <div style={{ display: 'flex' }}>
          {props.label}
          <Hjelpetekst className='orgnr-hjelpetekst' title={t(LangKey.ORGNR_HJELPETEKST_TITTEL)}>
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
