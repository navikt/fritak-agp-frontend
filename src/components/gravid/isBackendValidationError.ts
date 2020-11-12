import {
  lagreGravideBackendError,
  lagreGravideResponse
} from '../../api/lagreGravidesoknad';

function isBackendValidationError(
  beResponse:
    | lagreGravideBackendError
    | lagreGravideResponse
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return (
    (beResponse as lagreGravideResponse).validationErrors !== undefined &&
    (beResponse as lagreGravideResponse).validationErrors.length > 0
  );
}

export default isBackendValidationError;
