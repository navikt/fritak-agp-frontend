import { ValidationState } from './ValidationState';

const map401 = (state: ValidationState): ValidationState => {
  state.notAuthorized = true;
  state.kvittering = false;
  state.progress = false;
  state.error = true;
  state.login = true;
  return state;
};

export default map401;
