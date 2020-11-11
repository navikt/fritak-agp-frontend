interface feilmeldingAction {
  type: string;
  feilmelding: string;
}

function feilmeldingReducer(state: {}, action: feilmeldingAction): {} {
  switch (action.type) {
    case 'clear':
      return {};
    default:
      const newState = state;
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
