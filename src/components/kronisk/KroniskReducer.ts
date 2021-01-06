import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Årsfravær } from './Årsfravær';
import { validerTabell } from './TabellValidator';
import { PåkjenningerType } from './PåkjenningerType';
import isValidOrgnr from '../gravid/isValidOrgnr';
import isValidFnr from '../gravid/isValidFnr';
import { validateOrgnr } from '../validation/validateOrgnr';

const KroniskReducer = (
  state: KroniskState,
  action: KroniskAction
): KroniskState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return nextState;

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return nextState;

    case Actions.ToggleArbeid: // Toggler en input
      if (payload?.arbeid === undefined) {
        throw new Error('Du må spesifisere arbeidstype');
      }
      if (!nextState.arbeid) {
        nextState.arbeid = [];
      }
      if (state.arbeid?.includes(payload?.arbeid)) {
        nextState.arbeid.splice(state.arbeid?.indexOf(payload?.arbeid), 1);
      } else {
        nextState.arbeid.push(payload?.arbeid!);
      }
      return nextState;

    case Actions.TogglePaakjenninger:
      if (payload?.påkjenning === undefined) {
        throw new Error('Du må spesifisere påkjenning');
      }

      if (!nextState.påkjenninger) {
        nextState.påkjenninger = [];
      }

      if (state.påkjenninger?.includes(payload?.påkjenning)) {
        nextState.påkjenninger.splice(
          state.påkjenninger?.indexOf(payload?.påkjenning),
          1
        );
      } else {
        nextState.påkjenninger.push(payload?.påkjenning!);
      }

      console.log('TogglePåkjenninger', nextState.påkjenninger);

      return nextState;

    case Actions.Kommentar:
      nextState.kommentar = payload?.kommentar;
      return nextState;

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return nextState;

    case Actions.Fravær: //
      if (payload?.fravær == undefined) {
        throw new Error('Du må spesifisere fravær');
      }

      if (!nextState.fravær) {
        nextState.fravær = [];
      }

      // Hent ut ny verdi
      let { fravær } = payload;
      const { year, month, dager } = fravær;
      if (month < 0 || month > 11) {
        throw new Error('Month må være mellom 0 og 11');
      }

      // Finn eksisterende eller opprett ny
      let nextFravær =
        state.fravær?.find((f) => f.year === year) ||
        ({ year: year } as Årsfravær);

      if (!state.fravær?.includes(nextFravær)) {
        nextState.fravær?.push(nextFravær);
      }

      switch (month) {
        case 0:
          nextFravær.jan = dager;
          break;
        case 1:
          nextFravær.feb = dager;
          break;
        case 2:
          nextFravær.mar = dager;
          break;
        case 3:
          nextFravær.apr = dager;
          break;
        case 4:
          nextFravær.mai = dager;
          break;
        case 5:
          nextFravær.jun = dager;
          break;
        case 6:
          nextFravær.jul = dager;
          break;
        case 7:
          nextFravær.aug = dager;
          break;
        case 8:
          nextFravær.sep = dager;
          break;
        case 9:
          nextFravær.okt = dager;
          break;
        case 10:
          nextFravær.nov = dager;
          break;
        case 11:
          nextFravær.des = dager;
          break;
      }

      return nextState;

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return nextState;

    case Actions.Progress:
      if (payload?.progress == undefined) {
        throw new Error('Du må spesifisere progress');
      }
      nextState.progress = payload?.progress;
      return nextState;

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return nextState;

    case Actions.Validate:
      // Validering av felter
      nextState.fnrError = state.fnr == '' ? 'Må fylles ut' : '';
      nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
      nextState.bekreftError = state.bekreft == false ? 'Mangler bekreft' : '';
      nextState.påkjenningerError =
        state.påkjenninger?.length === 0 ? 'Må velge minst ett alternativ' : '';
      nextState.arbeidError =
        state.arbeid?.length === 0 ? 'Må velge minst ett alternativ' : '';

      if (state.orgnr && !isValidOrgnr(state.orgnr)) {
        nextState.orgnrError = 'Ugyldig organisasjonsnummer';
      }

      if (state.fnr && !isValidFnr(state.fnr)) {
        nextState.fnrError = 'Ugyldig fødselsnummer';
      }

      const feilmeldinger = new Array<FeiloppsummeringFeil>();

      if (nextState.fnrError) {
        feilmeldinger.push({
          skjemaelementId: 'fnr',
          feilmelding: 'Fødselsnummer må fylles ut'
        } as FeiloppsummeringFeil);
      }
      if (nextState.orgnrError) {
        feilmeldinger.push({
          skjemaelementId: 'orgnr',
          feilmelding: 'Organisasjonsnummer må fylles ut'
        } as FeiloppsummeringFeil);
      }
      if (nextState.arbeidError) {
        feilmeldinger.push({
          skjemaelementId: 'arbeidsutfører',
          feilmelding: 'Arbeid må fylles ut'
        } as FeiloppsummeringFeil);
      }
      if (nextState.påkjenningerError) {
        feilmeldinger.push({
          skjemaelementId: 'påkjenninger',
          feilmelding: 'Påkjenninger må fylles ut'
        } as FeiloppsummeringFeil);
      }
      if (
        state.påkjenninger?.includes(PåkjenningerType.Annet) &&
        !nextState.kommentar
      ) {
        feilmeldinger.push({
          skjemaelementId: 'påkjenninger',
          feilmelding: 'Kommentar må fylles ut'
        } as FeiloppsummeringFeil);
      }

      if (nextState.fraværError) {
        feilmeldinger.push({
          skjemaelementId: 'fravær',
          feilmelding: 'Dager må fylles ut'
        } as FeiloppsummeringFeil);
      }
      if (nextState.bekreftError) {
        feilmeldinger.push({
          skjemaelementId: 'bekreftFeilmeldingId',
          feilmelding: 'Må bekreftes'
        } as FeiloppsummeringFeil);
      }

      // Oppbygging av liste med feilmeldinger
      const arbeidFeilmeldinger = validerTabell(state?.fravær || []);

      nextState.fraværError =
        arbeidFeilmeldinger.length > 0 ? 'Mangler rettes' : '';

      nextState.feilmeldinger = feilmeldinger.concat(arbeidFeilmeldinger);
      return nextState;

    case Actions.Reset:
      return Object.assign({}, defaultKroniskState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
  if (nextState.validated == true) {
  }
};

export default KroniskReducer;
