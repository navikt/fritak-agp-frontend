import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input, Label } from 'nav-frontend-skjema';
import './KontrollsporsmaalLonn.scss';
import { v4 as uuid } from 'uuid';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { useTranslation } from 'react-i18next';
import LangKey from '../locale/LangKey';
import InternLenke from './felles/InternLenke/InternLenke';

interface KontrollsporsmaalLonnProps {
  onClose: (dager: number | undefined) => void;
  isOpen?: boolean;
  onCancelClick: () => void;
}

const KontrollsporsmaalLonn = (props: KontrollsporsmaalLonnProps) => {
  const [dager, setDager] = useState<number | undefined>(undefined);
  const inputId = uuid();
  const { t } = useTranslation();

  const onRequestClose = () => {
    props.onClose(dager);
  };

  const onRequestCloseClick = (event: React.MouseEvent) => {
    event.preventDefault();
    props.onClose(dager);
  };

  const onCancelClick = () => {
    props.onCancelClick();
  };

  return (
    <ModalWrapper
      onRequestClose={onRequestClose}
      contentLabel={t(LangKey.KONTROLLSPORSMAL_LONN_CONTENT_LABEL)}
      className='kontrollsporsmaal-lonn kontrollsporsmaal-lonn-bigair'
      closeButton={false}
      isOpen={!!props.isOpen}
    >
      <Innholdstittel className='textfelt-padding-dobbel-bottom'>
        {t(LangKey.KONTROLLSPORSMAL_LONN_TITTEL)}
      </Innholdstittel>
      <Normaltekst>{t(LangKey.KONTROLLSPORSMAL_LONN_INGRESS)}</Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>{t(LangKey.KONTROLLSPORSMAL_LONN_DAGER)}</Normaltekst>
      <Normaltekst className='textfelt-padding-dobbel-bottom'>
        {t(LangKey.KONTROLLSPORSMAL_LONN_GRUNNBELOP)}
      </Normaltekst>
      <Label htmlFor={inputId}>{t(LangKey.KONTROLLSPORSMAL_LONN_DAGER)}</Label>
      <div className='kontrollsporsmaal-lonn-input-wrapper textfelt-padding-dobbel-bottom'>
        <Input
          id={inputId}
          bredde='XS'
          inputMode='numeric'
          pattern='[0-9]*'
          defaultValue={dager}
          className='kontrollsporsmaal-lonn-arbeidsdager'
          onChange={(event) => setDager(Number(event.target.value))}
        />
        <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
          {t(LangKey.KONTROLLSPORSMAL_LONN_FORKLARING_DAGER)}
        </Normaltekst>
      </div>
      <Hovedknapp onClick={onRequestCloseClick}>{t(LangKey.KONTROLLSPORSMAL_LONN_SEND)}</Hovedknapp>
      <InternLenke onClick={onCancelClick} className='kontrollsporsmaal-lonn-lenke'>
        {t(LangKey.KONTROLLSPORSMAL_LONN_AVBRYT)}
      </InternLenke>
    </ModalWrapper>
  );
};

export default KontrollsporsmaalLonn;
