import { PageNotFoundKeys } from './PageNotFoundKeys';
import { Locale } from '../../locale/Locale';

export const PageNotFoundLanguage: Record<PageNotFoundKeys, Locale> = {
  PAGE_NOT_FOUND_TITLE: {
    nb: 'Siden finnes ikke',
    en: 'Page not found'
  },
  PAGE_NOT_FOUND_DESCRIPTION: {
    nb: 'Siden finnes ikke. [/nb/innsending](Gå til skjema for innsending)',
    en: 'Page not found. [/en/innsending](Go back to form for submitting)'
  }
};
