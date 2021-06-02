import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Innholdstittel } from 'nav-frontend-typografi';
import InternLenke from '../InternLenke/InternLenke';
import lenker from '../../../config/lenker';
import injectRedirectPath from './injectRedirectPath';
import Oversettelse from '../Oversettelse/Oversettelse';
import LangKey from '../../../locale/LangKey';
import { useTranslation } from 'react-i18next';

interface LoggetUtAdvarselProps {
  onClose: Function;
}

const LoggetUtAdvarsel = ({ onClose }: LoggetUtAdvarselProps) => {
  const loginServiceUrlAfterRedirect = injectRedirectPath(lenker.TokenFornyet);
  const { t } = useTranslation();

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={true}
      onRequestClose={() => handleCloseModal()}
      closeButton={false}
      className={'logget-ut-advarsel'}
      contentLabel=''
      shouldCloseOnOverlayClick={false}
    >
      <AlertStripeFeil className='logget-ut-advarsel__innhold'>
        <Innholdstittel>{t(LangKey.LOGGET_UT_ADVARSEL_TITTEL)}</Innholdstittel>
        <Oversettelse langKey={LangKey.LOGGET_UT_ADVARSEL_TEKST} variables={{ loginServiceUrlAfterRedirect }} />
        <InternLenke onClick={() => handleCloseModal()}>{t(LangKey.LOGGET_UT_ADVARSEL_LUKK)}</InternLenke>
      </AlertStripeFeil>
    </ModalWrapper>
  );
};

export default LoggetUtAdvarsel;
