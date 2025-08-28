import { v4 as uuid } from 'uuid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './KontrollSporsmaal.scss';
import { BodyLong, ErrorMessage, TextField } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export enum KontrollSporsmaalKeys {
  KONTROLLSPORSMAL_DAGER_LABEL = 'KONTROLLSPORSMAL_DAGER_LABEL',
  KONTROLLSPORSMAL_DAGER_FORKLARING = 'KONTROLLSPORSMAL_DAGER_FORKLARING',
  KONTROLLSPORSMAL_DAGER_FORKLARING_HREF = 'KONTROLLSPORSMAL_DAGER_FORKLARING_HREF',
  KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT = 'KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT'
}

interface KontrollSporsmaalProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  id?: string;
  feil?: string;
  defaultValue?: number;
}

const KontrollSporsmaal = ({ onChange, id, feil, defaultValue }: KontrollSporsmaalProps) => {
  const { t } = useTranslation();
  const elementId = id ? id : uuid();
  const feilClass = !!feil && feil.length > 2 ? 'harFeil' : '';

  return (
    <div className='skjemaelement kontrollsporsmaal'>
      <TextField
        id={elementId}
        inputMode='numeric'
        pattern='[0-9]*'
        className={'kontrollsporsmaal-lonn-arbeidsdager ' + feilClass}
        onChange={onChange}
        defaultValue={defaultValue}
        autoComplete='off'
        label={t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_LABEL)}
      />
      <BodyLong className='kontrollsporsmaal-lonn-forklaring '>
        <>
          {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING)}
          <a href='/fritak-agp/nb/eksemplerlonnsdager' target='_blank'>
            {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING_HREF)}
            <ExternalLinkIcon title='åpner i ny fane' />
          </a>
          {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT)}
        </>
      </BodyLong>
      {!!feil && (
        <div className='skjemaelement__feilmelding'>
          <ErrorMessage>{feil}</ErrorMessage>
        </div>
      )}
    </div>
  );
};

export default KontrollSporsmaal;
