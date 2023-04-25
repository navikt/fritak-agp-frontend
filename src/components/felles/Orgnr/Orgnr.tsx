import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import { BodyLong, TextField } from '@navikt/ds-react';
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
    <TextField
      defaultValue={props.orgnr}
      placeholder={props.placeholder}
      id='arbeidsgiverFeilmeldingId'
      label={
        <div style={{ display: 'flex' }}>
          {props.label}
          <Hjelpetekst className='orgnr-hjelpetekst' title={t(LangKey.ORGNR_HJELPETEKST_TITTEL)}>
            <BodyLong>{t(LangKey.ORGNR_HJELPETEKST)}</BodyLong>
          </Hjelpetekst>
        </div>
      }
      onChange={(evt) => props.onChange(evt.target.value)}
      error={props.feilmelding}
    />
  );
};

export default Orgnr;
