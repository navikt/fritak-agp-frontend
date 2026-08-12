import { ValidationState } from './ValidationState';

/**
 * Server Error
 */
const map500 = (state: ValidationState): ValidationState => {
  state.progress = false;
  state.serverError = true;
  return state;
};

export default map500;
