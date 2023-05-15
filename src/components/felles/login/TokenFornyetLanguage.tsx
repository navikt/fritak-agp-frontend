import { TokenFornyetKeys } from './TokenFornyetKeys';
import { Locale } from '../../../locale/Locales';

export const TokenFornyetLanguage: Record<TokenFornyetKeys, Locale> = {
  TOKEN_FORNYET_TITLE: {
    nb: 'Innloggingen er fornyet',
    en: 'Login renewed'
  },
  TOKEN_FORNYET_INFO: {
    nb: 'Du har nå fornyet innloggingen med en time.\n' + 'Dette vinduet kan nå lukkes.',
    en: 'You have now renewed your login by one hour.\n' + 'This window can now be closed.'
  },
  TOKEN_FORNYET_SIDETITTEL: {
    nb: 'Token er fornyet',
    en: 'Token is renewed'
  },
  TOKEN_FORNYET_LOGIN: {
    nb: 'Innlogging',
    en: 'Login'
  }
};
