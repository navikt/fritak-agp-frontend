import {
  lagreGravideBackendError,
  lagreGravideValidationError
} from '../../api/lagreGravidesoknad';

function isBackendValidationError(
  beResponse:
    | lagreGravideBackendError
    | lagreGravideValidationError
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return (
    (beResponse as lagreGravideValidationError).violations !== undefined &&
    (beResponse as lagreGravideValidationError).violations.length > 0
  );
}

export default isBackendValidationError;
