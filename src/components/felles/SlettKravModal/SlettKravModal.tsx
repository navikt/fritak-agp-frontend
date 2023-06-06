import { Button, Modal } from '@navikt/ds-react';
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
          <Button variant='secondary' onClick={() => props.onClose(false)}>
            Nei
          </Button>
          <Button onClick={(event) => props.onOKClicked(event)} loading={props.showSpinner}>
            Ja
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
