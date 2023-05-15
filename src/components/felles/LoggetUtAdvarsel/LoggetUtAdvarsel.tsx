import React from 'react';
import { InternLenke, Language } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useParams } from 'react-router-dom';
import injectRedirectPath from '../../../utils/injectRedirectPath';
import { Alert, Heading, Modal } from '@navikt/ds-react';

interface LoggetUtAdvarselInterface {
  onClose: any;
  tokenFornyet: string;
  loginServiceUrl: string;
}

const LoggetUtAdvarsel = (props: LoggetUtAdvarselInterface) => {
  let { language } = useParams();

  const handleCloseModal = () => {
    props.onClose();
  };

  const loginServiceUrlAfterRedirect = injectRedirectPath(
    props.loginServiceUrl,
    props.tokenFornyet,
    language as Language
  );

  return (
    <Modal
      open={true}
      onClose={() => handleCloseModal()}
      closeButton={false}
      className={'logget-ut-advarsel'}
      aria-labelledby='modal-heading'
      shouldCloseOnOverlayClick={false}
    >
      <Modal.Content>
        <Alert variant='warning' className='logget-ut-advarsel__innhold'>
          <Heading size='large' level='2' id='modal-heading'>
            Du er blitt logget ut, følg instruksjonene for ikke å miste data
          </Heading>
          <ul>
            <li>Ikke lukk dette vinduet</li>
            <li>
              <a href={loginServiceUrlAfterRedirect} rel='noopener noreferrer' target='_blank'>
                Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne lenken.
              </a>
            </li>
            <li>Logg inn på nytt i ID-porten.</li>
            <li>Returner til dette vinduet.</li>
            <li>Lukk denne meldingen og klikk igjen på knappen “Send søknad om refusjon”</li>
          </ul>
          <InternLenke onClick={() => handleCloseModal()}>Jeg har logget inn på nytt - lukk dette vinduet</InternLenke>
        </Alert>
      </Modal.Content>
    </Modal>
  );
};

export default LoggetUtAdvarsel;
