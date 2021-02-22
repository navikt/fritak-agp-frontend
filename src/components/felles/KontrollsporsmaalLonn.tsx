import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input, Label } from 'nav-frontend-skjema';
import './KontrollsporsmaalLonn.scss';
import { v4 as uuid } from 'uuid';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

interface KontrollsporsmaalLonnProps {
  onCloseWithDays: (dager: number | undefined) => void;
  isOpen?: boolean;
  onCloseCancel: () => void;
}

const KontrollsporsmaalLonn = (props: KontrollsporsmaalLonnProps) => {
  const [dager, setDager] = useState<number | undefined>(undefined);
  const inputId = uuid();

  const onRequestClose = () => {
    props.onCloseWithDays(dager);
  };

  const onCloseCancel = () => {
    props.onCloseCancel();
  };

  return (
    <ModalWrapper
      onRequestClose={onRequestClose}
      contentLabel='Kontrollspørsmål for lønn som overstiger 6g'
      className='kontrollsporsmaal-lonn kontrollsporsmaal-lonn-bigair'
      closeButton={false}
      isOpen={!!props.isOpen}
    >
      <Innholdstittel className='textfelt-padding-dobbel-bottom'>Det ser ut som om lønnen overstiger 6G</Innholdstittel>
      <Normaltekst>
        Vanligvis kan ikke dagsatsen overstige 1/260 av 6G*. For enkelte arbeidstidsordninger kan NAV likevel godkjenne
        en høyere dagsats, forutsatt at årslønnen ikke overstiger 6G.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>Oppgi antall dager dere utbetaler lønn for i året:</Normaltekst>
      <Normaltekst className='textfelt-padding-dobbel-bottom'>* G=folketrygdens grunnbeløp</Normaltekst>
      <Label htmlFor={inputId}>Oppgi antall dager dere utbetaler lønn for i året:</Label>
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
          (260 dager er vanlig for en ordinær 100% stilling)
        </Normaltekst>
      </div>
      <Hovedknapp onClick={onRequestClose}>Send kravet</Hovedknapp>
      <Lenke href='#' onClick={onCloseCancel} className='kontrollsporsmaal-lonn-lenke'>
        Avbryt og gå tilbake til skjema
      </Lenke>
    </ModalWrapper>
  );
};

export default KontrollsporsmaalLonn;
