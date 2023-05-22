import ValidationState from './ValidationState';

/**
 * Not authorized
 */
const map401 = (state: ValidationState): ValidationState => {
  state.notAuthorized = true;
  state.progress = false;
  return state;
};

export default map401;
