import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationError from '../../api/ValidationError';

function isBackendValidationError(
  beResponse:
    | lagreGravideBackendError
    | ValidationError
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return (
    (beResponse as ValidationError).violations !== undefined &&
    (beResponse as ValidationError).violations.length > 0
  );
}

export default isBackendValidationError;
