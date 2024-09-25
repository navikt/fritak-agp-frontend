import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Oversettelse from '../Oversettelse/Oversettelse';
import InternLenke from '../InternLenke/InternLenke';
import injectRedirectPath from '../../../utils/injectRedirectPath';
import { LoggetUtAdvarselKeys } from './LoggetUtAdvarselKeys';
import Language from '../../../locale/Language';
import { Alert, Heading, Modal } from '@navikt/ds-react';

interface LoggetUtAdvarselProps {
  onClose: Function;
  loginServiceUrl: string;
  tokenFornyet: string;
}

const LoggetUtAdvarsel = ({ onClose, loginServiceUrl, tokenFornyet }: LoggetUtAdvarselProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const loginServiceUrlAfterRedirect = injectRedirectPath(loginServiceUrl, tokenFornyet, language as Language);
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={() => handleCloseModal()}
      className={'logget-ut-advarsel'}
      aria-label={t(LoggetUtAdvarselKeys.LOGGET_UT_ADVARSEL_LOGGET_UT)}
    >
      <Modal.Body>
        <Alert variant='error' className='logget-ut-advarsel__innhold'>
          <Heading size='large' level='2'>
            {t(LoggetUtAdvarselKeys.LOGGET_UT_ADVARSEL_LOGGET_UT)}
          </Heading>

          <Oversettelse
            langKey={LoggetUtAdvarselKeys.LOGGET_UT_ADVARSEL_INFO}
            variables={{ innloggingUrl: loginServiceUrlAfterRedirect }}
          />
          <InternLenke onClick={() => handleCloseModal()}>
            {t(LoggetUtAdvarselKeys.LOGGET_UT_ADVARSEL_LOGIN)}
          </InternLenke>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default LoggetUtAdvarsel;
