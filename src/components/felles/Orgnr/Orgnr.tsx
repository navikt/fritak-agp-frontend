import React from 'react';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import { BodyLong, HelpText, TextField } from '@navikt/ds-react';
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

  const oversettelse = t(LangKey.ORGNR_HJELPETEKST_TITTEL);

  return (
    <TextField
      defaultValue={props.orgnr}
      placeholder={props.placeholder}
      id='arbeidsgiverFeilmeldingId'
      label={
        <div style={{ display: 'flex' }}>
          {props.label}
          <HelpText className='orgnr-hjelpetekst' title={oversettelse}>
            <BodyLong>{t(LangKey.ORGNR_HJELPETEKST)}</BodyLong>
          </HelpText>
        </div>
      }
      onChange={(evt) => props.onChange(evt.target.value)}
      error={props.feilmelding}
    />
  );
};

export default Orgnr;
