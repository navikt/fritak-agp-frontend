import Language from '../locale/Language';

enum lenker {
  Home = '/:language/',
  TokenFornyet = '/:language/token-fornyet',
  NotifikasjonGravidSoknad = '/:language/notifikasjon/gravid/soknad/:uuid',
  NotifikasjonGravidKrav = '/:language/notifikasjon/gravid/krav/:uuid',
  NotifikasjonKroniskSoknad = '/:language/notifikasjon/kronisk/soknad/:uuid',
  NotifikasjonKroniskKrav = '/:language/notifikasjon/kronisk/krav/:uuid',
  Gravid = '/:language/gravid/soknad',
  GravidKvittering = '/:language/gravid/soknad/kvittering',
  Kronisk = '/:language/kronisk/soknad',
  KroniskKvittering = '/:language/kronisk/soknad/kvittering',
  GravidKrav = '/:language/gravid/krav',
  GravidKravKvittering = '/:language/gravid/krav/kvittering',
  KroniskKrav = '/:language/kronisk/krav',
  KroniskKravKvittering = '/:language/kronisk/krav/kvittering',
  /*
  Home = '/',
  TokenFornyet = '/token-fornyet',
  NotifikasjonGravidSoknad = '/notifikasjon/gravid/soknad/:uuid',
  NotifikasjonGravidKrav = '/notifikasjon/gravid/krav/:uuid',
  NotifikasjonKroniskSoknad = '/notifikasjon/kronisk/soknad/:uuid',
  NotifikasjonKroniskKrav = '/notifikasjon/kronisk/krav/:uuid',
  Gravid = '/:lang/gravid/soknad',
  GravidKvittering = '/gravid/soknad/kvittering',
  Kronisk = '/kronisk/soknad',
  KroniskKvittering = '/kronisk/soknad/kvittering',
  GravidKrav = '/gravid/krav',
  GravidKravKvittering = '/gravid/krav/kvittering',
  KroniskKrav = '/kronisk/krav',
  KroniskKravKvittering = '/kronisk/krav/kvittering'
  */
}

export const buildLenke = (lenke: lenker, lang: Language) =>
  lenke.replace(':language', lang);

export default lenker;
