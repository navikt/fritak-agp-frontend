import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationResponse from '../../api/ValidationResponse';

function isBackendValidationError(
  beResponse:
    | lagreGravideBackendError
    | ValidationResponse
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return (
    (beResponse as ValidationResponse).violations !== undefined &&
    (beResponse as ValidationResponse).violations.length > 0
  );
}

export default isBackendValidationError;
