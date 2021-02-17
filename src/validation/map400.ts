import { ValidationState } from './ValidationState';

const map400 = (state: ValidationState): ValidationState => {
  state.notAuthorized = false;
  state.kvittering = false;
  state.progress = false;
  state.serverError = true;
  state.login = false;
  return state;
};

export default map400;
