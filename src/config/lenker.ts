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
  GravidKravSlettetKvittering = '/:language/gravid/krav/slettet/kvittering',
  GravidKravEndringKvittering = '/:language/gravid/krav/endring/kvittering',
  KroniskKrav = '/:language/kronisk/krav',
  KroniskKravKvittering = '/:language/kronisk/krav/kvittering',
  KroniskKravSlettetKvittering = '/:language/kronisk/krav/slettet/kvittering',
  KroniskKravEndringKvittering = '/:language/kronisk/krav/endring/kvittering',
  EksemplerLonnsdager = '/:language/eksemplerlonnsdager'
}

export const buildLenke = (lenke: lenker, lang: Language) => lenke.replace(':language', lang);

export default lenker;
