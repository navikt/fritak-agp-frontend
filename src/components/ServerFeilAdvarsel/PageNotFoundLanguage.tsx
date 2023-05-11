import { ServerFeilAdvarselKeys } from './ServerFeilAdvarselKeys';
import { Locale } from '../../locale/Locales';

export const PageNotFoundLanguage: Record<ServerFeilAdvarselKeys, Locale> = {
  SERVER_FEIL_ADVARSEL_TEXT: {
    nb:
      '_Det har desverre oppstått en teknisk feil hos oss_\n\n' +
      'Prøv igjen litt senere, og [kontakt oss gjerne dersom det ikke ordner seg.](https://arbeidsgiver.nav.no/kontakt-oss/)',
    en:
      '_Unfortunately, a technical error has occurred_\n\n' +
      'Please try again later and [feel free to contact us if it does not work out.](https://arbeidsgiver.nav.no/kontakt-oss/)'
  },
  SERVER_FEIL_ADVARSEL_HIDE: {
    nb: 'Skjul denne meldingen.',
    en: 'Hide this message.'
  }
};
