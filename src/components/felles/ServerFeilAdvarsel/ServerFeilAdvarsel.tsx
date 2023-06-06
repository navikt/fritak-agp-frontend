import React from 'react';
import Oversettelse from '../Oversettelse/Oversettelse';
import { useTranslation } from 'react-i18next';
import { ServerFeilAdvarselKeys } from './ServerFeilAdvarselKeys';
import { Alert, Heading, Link, Modal } from '@navikt/ds-react';

interface ServerFeilAdvarselProps {
  onClose: () => void;
  isOpen?: boolean;
}

const ServerFeilAdvarsel = (props: ServerFeilAdvarselProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={props.isOpen!}
      onClose={() => props.onClose()}
      className='server-feil-advarsel'
      closeButton={true}
      aria-labelledby='modal-heading'
    >
      <Modal.Content>
        <Alert variant='error' className='server-feil-advarsel--innhold'>
          <Heading spacing level='2' size='medium' id='modal-heading'>
            {t(ServerFeilAdvarselKeys.SERVER_FEIL_ADVARSEL_HEADING)}
          </Heading>
          <div>
            <Oversettelse langKey={ServerFeilAdvarselKeys.SERVER_FEIL_ADVARSEL_TEXT} />
          </div>
          <br />
          <div>
            <Link onClick={() => props.onClose()}>{t(ServerFeilAdvarselKeys.SERVER_FEIL_ADVARSEL_HIDE)}</Link>
          </div>
        </Alert>
      </Modal.Content>
    </Modal>
  );
};

export default ServerFeilAdvarsel;
