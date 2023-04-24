import { v4 as uuid } from 'uuid';
import { Input, Label } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './KontrollSporsmaal.scss';
import { BodyLong } from '@navikt/ds-react';

export enum KontrollSporsmaalKeys {
  KONTROLLSPORSMAL_DAGER_LABEL = 'KONTROLLSPORSMAL_DAGER_LABEL',
  KONTROLLSPORSMAL_DAGER_FORKLARING = 'KONTROLLSPORSMAL_DAGER_FORKLARING',
  KONTROLLSPORSMAL_DAGER_FORKLARING_HREF = 'KONTROLLSPORSMAL_DAGER_FORKLARING_HREF',
  KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT = 'KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT'
}

interface KontrollSporsmaalProps {
  onChange: any;
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
      <Label htmlFor={elementId}>{t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_LABEL)}</Label>
      <Input
        id={elementId}
        bredde='XS'
        inputMode='numeric'
        pattern='[0-9]*'
        className={'kontrollsporsmaal-lonn-arbeidsdager ' + feilClass}
        onChange={onChange}
        defaultValue={defaultValue}
        autoComplete='off'
      />
      <BodyLong className='kontrollsporsmaal-lonn-forklaring '>
        <>
          {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING)}
          <a href='/fritak-agp/nb/eksemplerlonnsdager' target='_blank'>
            {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING_HREF)}
          </a>
          {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT)}
        </>
      </BodyLong>
      {!!feil && (
        <div className='skjemaelement__feilmelding'>
          <Feilmelding className=''>{feil}</Feilmelding>
        </div>
      )}
    </div>
  );
};

export default KontrollSporsmaal;
