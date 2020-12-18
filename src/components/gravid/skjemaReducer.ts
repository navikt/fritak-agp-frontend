import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';

interface skjemaAction {
  field: string;
  value: string | boolean;
}

export interface skjemaState {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  tiltak?: Tiltak[];
  omplassering?: Omplassering;
  omplasseringAarsak?: OmplasseringAarsak;
  tiltakBeskrivelse?: string;
  bekreftet?: boolean;
  dokumentasjon?: string;
}

function updateTiltakListe(state: skjemaState, field: Tiltak): skjemaState {
  const newState: skjemaState = Object.assign({}, state);
  let stateTiltak: Tiltak[] | undefined = newState.tiltak;
  let elementPos = -1;

  if (stateTiltak) {
    elementPos = stateTiltak.indexOf(field);
  } else {
    newState.tiltak = [];
    stateTiltak = newState.tiltak;
  }

  if (elementPos === -1) {
    stateTiltak.push(field);
  } else {
    stateTiltak.splice(elementPos, 1);
  }

  return newState;
}

function skjemaReducer(state: skjemaState, action: skjemaAction): skjemaState {
  let setNewState = {};
  switch (action.field) {
    case 'clear':
      setNewState = {};
      break;
    case Tiltak.TILPASSET_ARBEIDSTID:
    case Tiltak.HJEMMEKONTOR:
    case Tiltak.TILPASSEDE_ARBEIDSOPPGAVER:
    case Tiltak.ANNET:
      setNewState = updateTiltakListe(state, action.field);
      // upsertElement(state, action.field, action.value);
      break;
    case 'omplassering':
      const omplasseringState: skjemaState = Object.assign({}, state);
      if (action.value !== Omplassering.IKKE_MULIG) {
        delete omplasseringState['omplasseringAarsak'];
      }

      omplasseringState[action.field] = action.value as Omplassering;

      setNewState = omplasseringState;
      break;
    default:
      const newState = Object.assign({}, state);
      const keys = Object.keys(newState);

      const index = keys.indexOf(action.field);

      if (index > -1) {
        newState[action.field] = action.value;
      }

      if (action.value === '') {
        delete newState[action.field];
      } else {
        newState[action.field] = action.value;
      }
      setNewState = newState;
  }

  return setNewState;
}

export default skjemaReducer;
