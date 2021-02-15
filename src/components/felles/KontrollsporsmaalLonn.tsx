import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Input, Label } from 'nav-frontend-skjema';
import './KontrollsporsmaalLonn.scss';
import { v4 as uuid } from 'uuid';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Link } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';

interface KontrollsporsmaalLonnProps {
  onClose: (dager: number | undefined) => void;
  isOpen: boolean;
  onCloseCancel: () => void;
}

const KontrollsporsmaalLonn = (props: KontrollsporsmaalLonnProps) => {
  const [dager, setDager] = useState<number | undefined>(undefined);
  const inputId = uuid();

  const onRequestClose = () => {
    props.onClose(dager);
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
      isOpen={props.isOpen}
    >
      <Innholdstittel className='textfelt-padding-dobbel-bottom'>
        Kontrollspørsmål for lønn som overstiger 6g
      </Innholdstittel>
      <Normaltekst className='textfelt-padding-dobbel-bottom'>
        For å kunne regne presist ut hvor mye dere har rett på i støtte trenger vi å vite litt mer om hvordan den
        ansatte kompenseres. ….Berit - her har du sikkert ei god formulering.
      </Normaltekst>
      <Label htmlFor={inputId}>Arbeidsdager per år i følge ansettelsesavtalen</Label>
      <div className='kontrollsporsmaal-lonn-input-wrapper textfelt-padding-dobbel-bottom'>
        <Input
          id={inputId}
          bredde='XS'
          inputMode='numeric'
          pattern='[0-9]*'
          value={dager}
          className='kontrollsporsmaal-lonn-arbeidsdager'
          onChange={(event) => setDager(Number(event.target.value))}
        />
        <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
          (260 dager er vanlig for en ordinær 100% stilling)
        </Normaltekst>
      </div>
      <Hovedknapp onClick={onRequestClose}>Send kravet</Hovedknapp>
      <Lenke href='#' onClick={onRequestClose} className='kontrollsporsmaal-lonn-lenke'>
        Avbryt og gå tilbake til skjema
      </Lenke>
    </ModalWrapper>
  );
};

export default KontrollsporsmaalLonn;
