import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

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
      nextState.arbeid.push(payload?.arbeid!);
      return nextState;

    case Actions.TogglePaakjenninger:
      if (payload?.påkjenning === undefined) {
        throw new Error('Du må spesifisere påkjenning');
      }
      if (!nextState.påkjenninger) {
        nextState.påkjenninger = [];
      }
      nextState.påkjenninger.push(payload?.påkjenning!);
      return nextState;

    case Actions.Kommentar:
      nextState.kommentar = payload?.kommentar;
      return nextState;

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return nextState;

    case Actions.Fravær: //
      if (!payload?.fravær) {
        throw new Error('Du må spesifisere fravær');
      }

      if (!nextState.fravær) {
        nextState.fravær = [];
      }

      let { fravær } = payload;
      const { year, month, dager } = fravær;
      nextState.fravær.push({ year: year, [month]: dager });
      return nextState;

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return nextState;

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return nextState;

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
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
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default KroniskReducer;
