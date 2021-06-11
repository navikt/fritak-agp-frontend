import { ValidationState } from './ValidationState';

/**
 * Status Ok
 */
const map201 = (state: ValidationState): ValidationState => {
  state.kvittering = true;
  state.progress = false;
  return state;
};

export default map201;
