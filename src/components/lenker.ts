enum lenker {
  Home = '/',
  TokenFornyet = '/token-fornyet',
  Notifikasjon = '/notifikasjon',
  NotifikasjonGravidSoknad = '/notifikasjon/gravid/soknad/:uuid',
  NotifikasjonGravidKrav = '/notifikasjon/kronisk/krav/:uuid',
  NotifikasjonKroniskSoknad = '/notifikasjon/gravid/soknad/:uuid',
  NotifikasjonKroniskKrav = '/notifikasjon/kronisk/krav/:uuid',
  Gravid = '/gravid/soknad',
  GravidKvittering = '/gravid/soknad/kvittering',
  Kronisk = '/kronisk/soknad',
  KroniskKvittering = '/kronisk/soknad/kvittering',
  GravidKrav = '/gravid/krav',
  GravidKravKvittering = '/gravid/krav/kvittering',
  Kronisk_Krav = '/kronisk/krav',
  Kronisk_Krav_Kvittering = '/kronisk/krav/kvittering'
}

export default lenker;
