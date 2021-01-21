import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, FravaerType, KroniskAction, Payload } from './Actions';
import { Aarsfravaer } from './Aarsfravaer';
import { validateKronisk } from './validateKronisk';
import { MONTHS } from '../../utils/months';
import { monthKey } from '../../utils/monthKey';
import { mapValidationResponse } from './mapValidationResponse';
import PaakjenningerType from './PaakjenningerType';
import ValidationResponse from '../../api/ValidationResponse';
import ArbeidType from './ArbeidType';

const KroniskReducer = (
  state: KroniskState,
  action: KroniskAction
): KroniskState => {
  const nextState: KroniskState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateKronisk(nextState);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateKronisk(nextState);

    case Actions.ToggleArbeid:
      throwOnMissingArbeidstatus(payload);
      enshureArbeidIsNotUndefined(nextState);
      toggleArbeidNextState(state, payload, nextState);
      return validateKronisk(nextState);

    case Actions.TogglePaakjenninger:
      throwOnMissingPaakjenninger(payload);
      togglePaakjenningNextState(state, payload, nextState);
      return validateKronisk(nextState);

    case Actions.Kommentar:
      nextState.kommentar = payload?.kommentar;
      return validateKronisk(nextState);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return validateKronisk(nextState);

    case Actions.Fravaer: //
      throwOnMissingFravaer(payload);
      enshureFravaerIsNotUndefined(nextState);
      let fravaer = payload?.fravaer;
      const { year, month, dager } = fravaer as FravaerType;
      throwOnInvalidMonth(month);
      const antallDager = castDagerFromStringToNumber(dager);
      const monthProp = monthKey(MONTHS[month]);
      updateFravaerNextState(state, year, nextState, monthProp, antallDager);
      return validateKronisk(nextState);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateKronisk(nextState);

    case Actions.Progress:
      throwOnMissingProgress(payload);
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
      throwOnMissingResponse(payload);
      nextState.submitting = false;
      nextState.progress = false;
      nextState.validated = false;
      return mapValidationResponse(
        payload?.response as ValidationResponse,
        nextState
      );

    case Actions.CloseLoggedoutModal:
      nextState.accessDenied = false;
      return nextState;

    case Actions.Reset:
      return Object.assign({}, defaultKroniskState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default KroniskReducer;

function updateFravaerNextState(
  state: KroniskState,
  year: number,
  nextState: KroniskState,
  monthProp: string,
  antallDager: number | undefined
) {
  let nextFravaer =
    state.fravaer?.find((f) => f.year === year) ||
    ({ year: year } as Aarsfravaer);

  if (!state.fravaer?.includes(nextFravaer)) {
    nextState.fravaer?.push(nextFravaer);
  }
  nextFravaer[monthProp] = antallDager;
}

function togglePaakjenningNextState(
  state: KroniskState,
  payload: Payload | undefined,
  nextState: KroniskState
) {
  nextState.paakjenninger = enshurePaakjenningerIsNotUndefined(nextState);
  if (
    state.paakjenninger?.includes(payload?.paakjenning as PaakjenningerType)
  ) {
    nextState.paakjenninger.splice(
      state.paakjenninger?.indexOf(payload?.paakjenning as PaakjenningerType),
      1
    );
  } else {
    nextState.paakjenninger.push(payload?.paakjenning as PaakjenningerType);
  }
}

function toggleArbeidNextState(
  state: KroniskState,
  payload: Payload | undefined,
  nextState: KroniskState
) {
  nextState.arbeid = nextState.arbeid ? nextState.arbeid : [];

  if (state.arbeid?.includes(payload?.arbeid as ArbeidType)) {
    nextState.arbeid.splice(
      state.arbeid?.indexOf(payload?.arbeid as ArbeidType),
      1
    );
  } else {
    nextState.arbeid.push(payload?.arbeid as ArbeidType);
  }
}

function throwOnMissingResponse(payload: Payload | undefined) {
  if (payload?.response == undefined) {
    throw new Error('Du må spesifisere response');
  }
}

function throwOnMissingProgress(payload: Payload | undefined) {
  if (payload?.progress == undefined) {
    throw new Error('Du må spesifisere progress');
  }
}

function castDagerFromStringToNumber(dager: any) {
  return !parseInt(dager) ? undefined : parseInt(dager);
}

function throwOnInvalidMonth(month: any) {
  if (month < 0 || month > 11) {
    throw new Error('Month må være mellom 0 og 11');
  }
}

function enshureFravaerIsNotUndefined(nextState: KroniskState) {
  if (!nextState.fravaer) {
    nextState.fravaer = [];
  }
}

function throwOnMissingFravaer(payload: Payload | undefined) {
  if (payload?.fravaer == undefined) {
    throw new Error('Du må spesifisere fravær');
  }
}

function enshureArbeidIsNotUndefined(nextState: KroniskState) {
  if (!nextState.arbeid) {
    nextState.arbeid = [];
  }
}

function enshurePaakjenningerIsNotUndefined(
  nextState: KroniskState
): PaakjenningerType[] {
  if (!nextState.paakjenninger) {
    return [];
  }
  return nextState.paakjenninger;
}

function throwOnMissingPaakjenninger(payload: Payload | undefined) {
  if (payload?.paakjenning === undefined) {
    throw new Error('Du må spesifisere paakjenning');
  }
}

function throwOnMissingArbeidstatus(payload: Payload | undefined) {
  if (payload?.arbeid === undefined) {
    throw new Error('Du må spesifisere arbeidstype');
  }
}
