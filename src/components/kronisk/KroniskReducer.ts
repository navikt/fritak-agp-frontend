import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

const KroniskReducer = (
  state: KroniskState,
  action: KroniskAction
): KroniskState => {
  const nextState = Object.assign({}, state);
  console.log(action.payload);
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = action.payload?.fnr;
      return nextState;

    case Actions.Orgnr:
      nextState.orgnr = action.payload?.orgnr;
      return nextState;

    case Actions.ToggleArbeid: // Toggler en input
      if (action.payload?.arbeid === undefined) {
        throw new Error('Du må spesifisere arbeidstype');
      }
      if (!nextState.arbeid) {
        nextState.arbeid = [];
      }
      nextState.arbeid.push(action.payload?.arbeid!);
      return nextState;

    case Actions.TogglePaakjenninger:
      if (action.payload?.påkjenning === undefined) {
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
      const { year, month, dager } = fravær;
      nextState.fravær.push({ year: year, [month]: dager });
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
