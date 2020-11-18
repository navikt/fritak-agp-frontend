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
    (beResponse as lagreGravideResponse).violations !== undefined &&
    (beResponse as lagreGravideResponse).violations.length > 0
  );
}

export default isBackendValidationError;
