import { Modal } from '@navikt/ds-react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { useEffect } from 'react';
import '@navikt/ds-css';

interface SlettKravModalProps {
  onOKClicked: (event: React.FormEvent) => void;
  showSpinner: boolean;
  modalOpen: boolean;
  onClose: (state: boolean) => void;
}

export default function SlettKravModal(props: SlettKravModalProps) {
  useEffect(() => {
    Modal.setAppElement!('.kravside');
  }, []);

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      open={props.modalOpen}
      onClose={() => props.onClose(false)}
      className='kroniskkrav-modal'
    >
      <Modal.Content>
        <span className='kroniskkrav-modal-text'>Er du sikker på at du vil slette kravet?</span>
        <div className='kroniskkrav-modal-buttons'>
          <Knapp onClick={() => props.onClose(false)}>Nei</Knapp>
          <Hovedknapp onClick={(event) => props.onOKClicked(event)} spinner={props.showSpinner}>
            Ja
          </Hovedknapp>
        </div>
      </Modal.Content>
    </Modal>
  );
}
