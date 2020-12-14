interface feilmeldingAction {
  type: string;
  feilmelding: string;
}

interface feilmeldingState {
  [name: string]: string;
}

function setFeilstatus(
  felt: string,
  feilmelding: string,
  state: feilmeldingState | {}
): feilmeldingState | {} {
  const newState = Object.assign({}, state);
  const keys = Object.keys(newState);

  const index = keys.indexOf(felt);

  if (index > -1) {
    newState[felt] = feilmelding;
  }

  if (feilmelding === '') {
    delete newState[felt];
  } else {
    newState[felt] = feilmelding;
  }
  return newState;
}

function feilmeldingReducer(
  state: feilmeldingState | {},
  action: feilmeldingAction
): feilmeldingState {
  switch (action.type) {
    case 'clear':
      return {};
    case 'fnr':
      return setFeilstatus('ansatteFeilmeldingId', action.feilmelding, state);
    case 'orgnr':
      return setFeilstatus(
        'arbeidsgiverFeilmeldingId',
        action.feilmelding,
        state
      );
    case 'tiltak':
      return setFeilstatus('tiltakFeilmeldingId', action.feilmelding, state);
    default:
      return setFeilstatus(action.type, action.feilmelding, state);
  }
}

export default feilmeldingReducer;
