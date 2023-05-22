import { TilgangsfeilSideKeys } from './TilgangsfeilSideKeys';
import { Locale } from '../../../locale/Locales';

export const TilgangsfeilSideLanguage: Record<TilgangsfeilSideKeys, Locale> = {
  TILGANGSFEILSIDE_DENIED: {
    nb: 'Du har ikke tilgang',
    en: 'No access'
  },
  TILGANGSFEILSIDE_ERROR: {
    nb: 'Det oppstod en feil',
    en: 'An error occurred'
  },
  TILGANGSFEILSIDE_LOGIN: {
    nb: 'Vi klarte ikke logge deg inn. Vennligst prøv igjen senere.',
    en: 'We were unable to log you in. Please try again later.'
  }
};
