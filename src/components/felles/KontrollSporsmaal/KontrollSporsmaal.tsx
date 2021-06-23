import { v4 as uuid } from 'uuid';
import { Input, Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './KontrollSporsmaal.scss';

export enum KontrollSporsmaalKeys {
  KONTROLLSPORSMAL_DAGER_LABEL = 'KONTROLLSPORSMAL_DAGER_LABEL',
  KONTROLLSPORSMAL_DAGER_FORKLARING = 'KONTROLLSPORSMAL_DAGER_FORKLARING'
}

interface KontrollSporsmaalProps {
  onChange: any;
  id?: string;
}

const KontrollSporsmaal = ({ onChange, id }: KontrollSporsmaalProps) => {
  const { t } = useTranslation();
  const elementId = id ? id : uuid();

  return (
    <>
      <Label htmlFor={elementId}>{t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_LABEL)}</Label>
      <Input
        id={elementId}
        bredde='XS'
        inputMode='numeric'
        pattern='[0-9]*'
        className='kontrollsporsmaal-lonn-arbeidsdager'
        onChange={onChange}
      />
      <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
        {t(KontrollSporsmaalKeys.KONTROLLSPORSMAL_DAGER_FORKLARING)}
      </Normaltekst>
    </>
  );
};

export default KontrollSporsmaal;
