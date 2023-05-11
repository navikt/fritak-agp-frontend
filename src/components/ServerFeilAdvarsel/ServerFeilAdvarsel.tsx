import React from 'react';
import ModalWrapper from 'nav-frontend-modal';

import { useTranslation } from 'react-i18next';

import { ServerFeilAdvarselKeys } from './ServerFeilAdvarselKeys';
import { InternLenke, Oversettelse } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Alert } from '@navikt/ds-react';

interface ServerFeilAdvarselProps {
  onClose: () => void;
  isOpen?: boolean;
}

const ServerFeilAdvarsel = (props: ServerFeilAdvarselProps) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper
      isOpen={props.isOpen!}
      onRequestClose={() => props.onClose()}
      closeButton={false}
      className='server-feil-advarsel'
      contentLabel=''
      shouldCloseOnOverlayClick={false}
    >
      <Alert variant='error' className='server-feil-advarsel--innhold'>
        <p>
          <Oversettelse langKey={ServerFeilAdvarselKeys.SERVER_FEIL_ADVARSEL_TEXT} />
        </p>
        <p>
          <InternLenke onClick={() => props.onClose()}>
            {t(ServerFeilAdvarselKeys.SERVER_FEIL_ADVARSEL_HIDE)}
          </InternLenke>
        </p>
      </Alert>
    </ModalWrapper>
  );
};

export default ServerFeilAdvarsel;
