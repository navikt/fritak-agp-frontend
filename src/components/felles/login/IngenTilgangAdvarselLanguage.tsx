import { IngenTilgangAdvarselKeys } from './IngenTilgangAdvarselKeys';
import { Locale } from '../../../locale/Locales';

export const IngenTilgangAdvarselLanguage: Record<IngenTilgangAdvarselKeys, Locale> = {
  INGEN_TILGANG_ADVARSEL: {
    nb:
      'Du har ikke rettigheter til å søke om refusjon for noen bedrifter\n' +
      'Tildeling av roller foregår i Altinn\n' +
      '[Les mer om roller og tilganger](https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring)',
    en:
      'You do not have the rights to apply for reimbursement for any companies\n' +
      'Assignment of roles takes place in Altinn\n' +
      '[Read more about roles and accesses](https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring)'
  }
};
