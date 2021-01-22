import { ValidationState } from './ValidationState';

const map422 = (state: ValidationState): ValidationState => {
  state.kvittering = false;
  state.progress = false;
  state.error = false;
  return state;
};

export default map422;
