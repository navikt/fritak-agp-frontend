import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { Aarsfravaer } from './Aarsfravaer';
import { validateKronisk } from './validateKronisk';
import { MONTHS } from '../../utils/months';
import { monthKey } from '../../utils/monthKey';
import { mapValidationResponse } from './mapValidationResponse';

const KroniskReducer = (
  state: KroniskState,
  action: KroniskAction
): KroniskState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateKronisk(nextState);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateKronisk(nextState);

    case Actions.ToggleArbeid:
      if (payload?.arbeid === undefined) {
        throw new Error('Du må spesifisere arbeidstype');
      }
      if (!nextState.arbeid) {
        nextState.arbeid = [];
      }
      if (state.arbeid?.includes(payload.arbeid)) {
        nextState.arbeid.splice(state.arbeid?.indexOf(payload.arbeid), 1);
      } else {
        nextState.arbeid.push(payload.arbeid);
      }
      return validateKronisk(nextState);

    case Actions.TogglePaakjenninger:
      if (payload?.paakjenning === undefined) {
        throw new Error('Du må spesifisere paakjenning');
      }
      if (!nextState.paakjenninger) {
        nextState.paakjenninger = [];
      }
      if (state.paakjenninger?.includes(payload?.paakjenning)) {
        nextState.paakjenninger.splice(
          state.paakjenninger?.indexOf(payload?.paakjenning),
          1
        );
      } else {
        nextState.paakjenninger.push(payload?.paakjenning);
      }
      return validateKronisk(nextState);

    case Actions.Kommentar:
      nextState.kommentar = payload?.kommentar;
      return validateKronisk(nextState);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon ?? undefined;
      return validateKronisk(nextState);

    case Actions.Fravaer: //
      if (payload?.fravaer == undefined) {
        throw new Error('Du må spesifisere fravær');
      }
      if (!nextState.fravaer) {
        nextState.fravaer = [];
      }
      let { fravaer } = payload;
      const { year, month, dager } = fravaer;
      if (month < 0 || month > 11) {
        throw new Error('Month må være mellom 0 og 11');
      }
      const antallDager = !parseInt(dager) ? undefined : parseInt(dager);
      const monthProp = monthKey(MONTHS[month]);
      let nextFravaer =
        state.fravaer?.find((f) => f.year === year) ||
        ({ year: year } as Aarsfravaer);

      if (!state.fravaer?.includes(nextFravaer)) {
        nextState.fravaer?.push(nextFravaer);
      }
      nextFravaer[monthProp] = antallDager;
      return validateKronisk(nextState);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateKronisk(nextState);

    case Actions.Progress:
      if (payload?.progress == undefined) {
        throw new Error('Du må spesifisere progress');
      }
      nextState.progress = payload?.progress;
      return validateKronisk(nextState);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateKronisk(nextState);

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateKronisk(nextState);
      validatedState.submitting = validatedState.feilmeldinger?.length === 0;
      validatedState.progress = validatedState.submitting;
      return validatedState;

    case Actions.HandleResponse:
      if (payload?.response == undefined) {
        throw new Error('Du må spesifisere response');
      }
      nextState.submitting = false;
      nextState.progress = false;
      nextState.validated = false;
      return mapValidationResponse(payload.response, nextState);

    case Actions.Reset:
      return Object.assign({}, defaultKroniskState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default KroniskReducer;
