import { ValidationState } from './ValidationState';

/**
 * Bad request
 */
const map400 = (state: ValidationState): ValidationState => {
  state.progress = false;
  state.serverError = true;
  return state;
};

export default map400;
