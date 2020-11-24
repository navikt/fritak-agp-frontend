import {
  lagreGravideBackendError,
  lagreGravideValidationError
} from '../../api/lagreGravidesoknad';

function isBackendServerError(
  beResponse:
    | lagreGravideBackendError
    | lagreGravideValidationError
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return !(beResponse as lagreGravideValidationError).violations;
}

export default isBackendServerError;
