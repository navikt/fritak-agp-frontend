import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

const KroniskReducer = (
  state: KroniskState,
  action: KroniskAction
): KroniskState => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = action.payload?.fnr;
      return nextState;

    case Actions.Orgnr:
      nextState.orgnr = action.payload?.orgnr;
      return nextState;

    case Actions.ToggleArbeid: // Toggler en input
      if (action.payload?.arbeid) {
        throw new Error('Du må spesifisere arbeidstype');
      }
      if (!nextState.arbeid) {
        nextState.arbeid = [];
      }
      nextState.arbeid.push(action.payload?.arbeid!);
      return nextState;

    case Actions.TogglePaakjenninger:
      if (!action.payload?.påkjenning) {
        throw new Error('Du må spesifisere påkjenning');
      }
      if (!nextState.påkjenninger) {
        nextState.påkjenninger = [];
      }
      nextState.påkjenninger.push(action.payload?.påkjenning!);
      return nextState;

    case Actions.Kommentar:
      nextState.kommentar = action.payload?.kommentar;
      return nextState;

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = action.payload?.dokumentasjon;
      return nextState;

    case Actions.Fravær: //
      if (!action.payload?.fravær) {
        throw new Error('Du må spesifisere fravær');
      }

      if (!nextState.fravær) {
        nextState.fravær = [];
      }

      let { fravær } = action.payload;
      const { dager, month } = fravær;

      const existingYear = nextState.fravær!!.find(
        (f) => f.year === fravær!!.year
      );
      if (existingYear) {
        switch (month) {
          case 1:
            existingYear.jan = dager;
            break;
          case 2:
            existingYear.feb = dager;
            break;
          case 3:
            existingYear.mar = dager;
            break;
          case 4:
            existingYear.apr = dager;
            break;
          case 5:
            existingYear.mai = dager;
            break;
          case 6:
            existingYear.jun = dager;
            break;
          case 7:
            existingYear.jul = dager;
            break;
          case 8:
            existingYear.aug = dager;
            break;
          case 9:
            existingYear.sep = dager;
            break;
          case 10:
            existingYear.okt = dager;
            break;
          case 11:
            existingYear.nov = dager;
            break;
          case 12:
            existingYear.des = dager;
            break;
        }
      } else {
        switch (month) {
          case 1:
            nextState.fravær.push({ year: fravær?.year, jan: dager });
            break;
          case 2:
            nextState.fravær.push({ year: fravær?.year, feb: dager });
            break;
          case 3:
            nextState.fravær.push({ year: fravær?.year, mar: dager });
            break;
          case 4:
            nextState.fravær.push({ year: fravær?.year, apr: dager });
            break;
          case 5:
            nextState.fravær.push({ year: fravær?.year, mai: dager });
            break;
          case 6:
            nextState.fravær.push({ year: fravær?.year, jun: dager });
            break;
          case 7:
            nextState.fravær.push({ year: fravær?.year, jul: dager });
            break;
          case 8:
            nextState.fravær.push({ year: fravær?.year, aug: dager });
            break;
          case 9:
            nextState.fravær.push({ year: fravær?.year, sep: dager });
            break;
          case 10:
            nextState.fravær.push({ year: fravær?.year, okt: dager });
            break;
          case 11:
            nextState.fravær.push({ year: fravær?.year, nov: dager });
            break;
          case 12:
            nextState.fravær.push({ year: fravær?.year, des: dager });
            break;
        }
      }
      return nextState;

    case Actions.Bekreft:
      nextState.bekreft = action.payload?.bekreft;
      return nextState;

    case Actions.Progress:
      nextState.progress = action.payload?.progress;
      return nextState;

    case Actions.Kvittering:
      nextState.kvittering = action.payload?.kvittering;
      return nextState;

    case Actions.Validate:
      // Validering av felter
      nextState.fnrError = state.fnr == '' ? 'Mangler fnr' : '';
      nextState.orgnrError = state.orgnr == '' ? 'Mangler orgnr' : '';

      // Oppbygging av liste med feilmeldinger
      nextState.feilmeldinger = new Array<FeiloppsummeringFeil>();
      if (nextState.fnrError) {
        nextState.feilmeldinger.push({
          skjemaelementId: 'fnr',
          feilmelding: 'Fødslesnummer må fylles ut'
        } as FeiloppsummeringFeil);
      }
      return nextState;

    case Actions.Reset:
      return Object.assign({}, defaultKroniskState());

    default:
      throw new Error('Ugyldig action');
  }
};

export default KroniskReducer;
