import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';

interface skjemaAction {
  field: string;
  value: string;
}

interface skjemaState {
  fnr?: string;
  tilrettelegge?: boolean;
  Tiltak?: Tiltak[];
  Omplassering?: Omplassering;
  OmplasseringAarsak?: OmplasseringAarsak;
  TiltakBeskrivelse?: string;
}

// [name: string]: string;

function updateTiltakListe(state: skjemaState, field: Tiltak) {
  const newState: skjemaState = Object.assign({}, state);
  let Tiltak: Tiltak[] | undefined = newState.Tiltak;
  let elementPos = -1;

  if (Tiltak) {
    elementPos = Tiltak.indexOf(field);
  } else {
    newState.Tiltak = [];
    Tiltak = newState.Tiltak;
  }

  if (elementPos === -1) {
    Tiltak.push(field);
  } else {
    Tiltak.splice(elementPos, 1);
  }

  return newState;
}

function upsertElement(state: skjemaState, field: string, value: string) {
  const newState: skjemaState = Object.assign({}, state);
  if (newState[field]) {
    delete newState[field];
  } else {
    newState[field] = value;
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
    case 'Omplassering':
      const omplasseringState: skjemaState = Object.assign({}, state);
      if (action.value !== Omplassering.IKKE_MULIG) {
        delete omplasseringState['OmplasseringAarsak'];
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
