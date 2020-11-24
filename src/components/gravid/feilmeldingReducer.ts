interface feilmeldingAction {
  type: string;
  feilmelding: string;
}

interface feilmeldingState {
  [name: string]: string;
}

function feilmeldingReducer(
  state: feilmeldingState | {},
  action: feilmeldingAction
): feilmeldingState {
  console.log('actionFeil', action);
  switch (action.type) {
    case 'clear':
      return {};
    default:
      const newState = Object.assign({}, state);
      const keys = Object.keys(newState);

      const index = keys.indexOf(action.type);

      if (index > -1) {
        newState[action.type] = action.feilmelding;
      }

      if (action.feilmelding === '') {
        delete newState[action.type];
      } else {
        newState[action.type] = action.feilmelding;
      }
      return newState;
  }
}

export default feilmeldingReducer;
