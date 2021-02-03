import { ValidationState } from './ValidationState';

const map500 = (state: ValidationState): ValidationState => {
  state.kvittering = false;
  state.progress = false;
  state.error = true;
  state.login = true;
  return state;
};

export default map500;
