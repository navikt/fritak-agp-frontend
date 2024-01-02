import ValidationState from './ValidationState';

/**
 * Bad request
 */
const map409 = (state: ValidationState): ValidationState => {
  state.progress = false;
  state.duplicateSubmission = true;
  return state;
};

export default map409;
