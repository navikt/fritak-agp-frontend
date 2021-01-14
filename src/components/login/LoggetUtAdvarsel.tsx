import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Innholdstittel } from 'nav-frontend-typografi';
import env from '../../environment';
import InternLenke from './InternLenke';
import lenker from '../lenker';

interface LoggetUtAdvarselProps {
  onClose: Function;
}

const LoggetUtAdvarsel = ({ onClose }: LoggetUtAdvarselProps) => {
  let url = new URL(env.loginServiceUrl);
  let params = new URLSearchParams(url.search);
  let redirect = params.get('redirect');

  const redirectParts = redirect?.split('?');

  const redir =
    redirectParts && redirectParts?.length > 1
      ? redirectParts[0] + lenker.TokenFornyet + '?' + redirectParts[1]
      : redirect;

  params.set('redirect', redir || redirect + '');

  const loginServiceUrlAfterRedirect = url.href + '?' + params.toString();

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
        <Innholdstittel>
          Du er blitt logget ut, følg instruksjonene for ikke å miste data
        </Innholdstittel>
        <ul>
          <li>Ikke lukk dette vinduet</li>
          <li>
            <a
              href={loginServiceUrlAfterRedirect}
              rel='noopener noreferrer'
              target='_blank'
            >
              Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne
              lenken.
            </a>
          </li>
          <li>Logg inn på nytt i ID-porten.</li>
          <li>Returner til dette vinduet.</li>
          <li>
            Lukk denne meldingen og klikk igjen på knappen “Send søknad om
            refusjon”
          </li>
        </ul>
        <InternLenke onClick={() => handleCloseModal()}>
          Jeg har logget inn på nytt - lukk dette vinduet
        </InternLenke>
      </AlertStripeFeil>
    </ModalWrapper>
  );
};

export default LoggetUtAdvarsel;
