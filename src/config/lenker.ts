import Language from '../locale/Language';

enum lenker {
  Home = '/',
  TokenFornyet = 'token-fornyet',
  NotifikasjonGravidSoknad = 'notifikasjon/gravid/soknad/:uuid',
  NotifikasjonGravidKrav = 'notifikasjon/gravid/krav/:uuid',
  NotifikasjonKroniskSoknad = 'notifikasjon/kronisk/soknad/:uuid',
  NotifikasjonKroniskKrav = 'notifikasjon/kronisk/krav/:uuid',
  Gravid = 'gravid/soknad',
  GravidKvittering = 'gravid/soknad/kvittering',
  Kronisk = 'kronisk/soknad',
  KroniskKvittering = 'kronisk/soknad/kvittering',
  GravidKrav = 'gravid/krav',
  GravidKravKvittering = 'gravid/krav/kvittering',
  GravidKravSlettetKvittering = 'gravid/krav/slettet/kvittering',
  GravidKravEndringKvittering = 'gravid/krav/endring/kvittering',
  KroniskKrav = 'kronisk/krav',
  KroniskKravKvittering = 'kronisk/krav/kvittering',
  KroniskKravSlettetKvittering = 'kronisk/krav/slettet/kvittering',
  KroniskKravEndringKvittering = 'kronisk/krav/endring/kvittering',
  EksemplerLonnsdager = 'eksemplerlonnsdager'
}

export const buildLenke = (lenke: lenker, lang: Language) => `/${lang}/${lenke}`;

export default lenker;
