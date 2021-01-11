import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationError from '../../api/ValidationError';

function isBackendServerError(
  beResponse:
    | lagreGravideBackendError
    | ValidationError
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return !(beResponse as ValidationError).violations;
}

export default isBackendServerError;
