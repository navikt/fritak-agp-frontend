import { v4 as uuid } from 'uuid';
import { Input, Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import './KontrollSporsmaal.scss';

interface KontrollSporsmaalProps {
  onChange: any;
  id?: string;
}

const KontrollSporsmaal = ({ onChange, id }: KontrollSporsmaalProps) => {
  const { t } = useTranslation();
  const elementId = id ? id : uuid();

  return (
    <>
      <Label htmlFor={elementId}>{t(LangKey.KONTROLLSPORSMAL_LONN_DAGER)}</Label>
      <Input
        id={elementId}
        bredde='XS'
        inputMode='numeric'
        pattern='[0-9]*'
        className='kontrollsporsmaal-lonn-arbeidsdager'
        onChange={onChange}
      />
      <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
        {t(LangKey.KONTROLLSPORSMAL_LONN_FORKLARING_DAGER)}
      </Normaltekst>
    </>
  );
};

export default KontrollSporsmaal;
