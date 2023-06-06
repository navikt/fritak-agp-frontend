import buildResources from './buildResources';
import { Locale } from './Locales';

describe('buildResources', () => {
  const source: Record<string, Locale> = {
    BEKREFTOPPLYSNINGER_BEKREFT_LABEL: {
      en: 'I confirm that...',
      nb: 'Jeg bekrefter...'
    },
    BEKREFTOPPLYSNINGER_BEKREFT_OPPLYSNINGER: {
      en: 'Information',
      nb: 'Opplysninger'
    }
  };

  const converted: Record<string, any> = {
    en: {
      translation: {
        BEKREFTOPPLYSNINGER_BEKREFT_LABEL: 'I confirm that...',
        BEKREFTOPPLYSNINGER_BEKREFT_OPPLYSNINGER: 'Information'
      }
    },
    nb: {
      translation: {
        BEKREFTOPPLYSNINGER_BEKREFT_LABEL: 'Jeg bekrefter...',
        BEKREFTOPPLYSNINGER_BEKREFT_OPPLYSNINGER: 'Opplysninger'
      }
    }
  };

  it('should build bundle', () => {
    expect(buildResources(source)).toEqual(converted);
  });
});
