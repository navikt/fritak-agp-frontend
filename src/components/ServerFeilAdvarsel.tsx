import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import './ServerFeilAdvarsel.sass';

interface ServerFeilAdvarselProps {
  onClose: () => void;
  isOpen?: boolean;
}

const ServerFeilAdvarsel = (props: ServerFeilAdvarselProps) => {
  return (
    <ModalWrapper
      isOpen={props.isOpen!}
      onRequestClose={() => props.onClose()}
      closeButton={false}
      className='server-feil-advarsel'
      contentLabel=''
      shouldCloseOnOverlayClick={false}
    >
      <AlertStripeFeil className='server-feil-advarsel--innhold'>
        <b>Det har desverre oppstått en teknisk feil hos oss</b>
        <br />
        <br />
        <div>
          Prøv igjen litt senere, og{' '}
          <a href={'https://arbeidsgiver.nav.no/kontakt-oss/'}>kontakt oss gjerne dersom det ikke ordner seg.</a>
        </div>
        <Lenke href='#' onClick={() => props.onClose()}>
          Skjul denne meldingen.
        </Lenke>
      </AlertStripeFeil>
    </ModalWrapper>
  );
};

export default ServerFeilAdvarsel;
