import { ValidationState } from './ValidationState';

const map201 = (state: ValidationState): ValidationState => {
  state.kvittering = true;
  state.progress = false;
  state.error = false;
  state.login = false;
  return state;
};

export default map201;
