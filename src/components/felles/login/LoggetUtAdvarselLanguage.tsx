import { LoggetUtAdvarselKeys } from './LoggetUtAdvarselKeys';
import { Locale } from '../../../locale/Locales';

export const LoggetUtAdvarselLanguage: Record<LoggetUtAdvarselKeys, Locale> = {
  LOGGET_UT_ADVARSEL_LOGGET_UT: {
    nb: 'Du er blitt logget ut, følg instruksjonene for ikke å miste data',
    en: 'You have been logged out, follow the instructions to not lose data'
  },

  LOGGET_UT_ADVARSEL_LOGIN: {
    nb: 'Jeg har logget inn på nytt - lukk dette vinduet',
    en: 'I logged in again - close this window'
  },
  LOGGET_UT_ADVARSEL_INFO: {
    nb:
      '-## ' +
      '-- Ikke lukk dette vinduet\n' +
      '-- [Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne lenken.]({{ innloggingUrl }})\n' +
      '-- Logg inn på nytt i ID-porten.\n' +
      '-- Returner til dette vinduet.\n' +
      '-- Lukk denne meldingen og klikk igjen på knappen "Send krav om refusjon".\n' +
      '##-\n',
    en:
      '-## ' +
      "-- Don't close this window\n" +
      '-- [Open ID-Porten (to log in) in a new window by clicking this link.]({{ innloggingUrl }})\n' +
      '-- Log in again in ID-porten.\n' +
      '-- Return to this window.\n' +
      '-- Close this message and click again on the button "Submit claim for reimbursement".\n' +
      '##-\n'
  }
};
