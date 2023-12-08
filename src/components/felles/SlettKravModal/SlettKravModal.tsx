import { Button, Modal } from '@navikt/ds-react';
import React from 'react';
import '@navikt/ds-css';

interface SlettKravModalProps {
  onOKClicked: (event: React.FormEvent) => void;
  showSpinner: boolean;
  modalOpen: boolean;
  onClose: (state: boolean) => void;
}

export default function SlettKravModal(props: SlettKravModalProps) {
  return (
    <Modal
      open={props.modalOpen}
      onClose={() => props.onClose(false)}
      className='kroniskkrav-modal'
      aria-label='Sletting av krav'
      header={{ heading: 'Er du sikker på at du vil annullere kravet?' }}
    >
      <Modal.Body>
        <span className='kroniskkrav-modal-text'>
          Ved annullering vil dette kravet om fritak fra arbeidsgiverperiode bortfalle.
        </span>
        <div className='kroniskkrav-modal-buttons'>
          <Button variant='secondary' onClick={() => props.onClose(false)}>
            Nei
          </Button>
          <Button onClick={(event) => props.onOKClicked(event)} loading={props.showSpinner}>
            Ja
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
