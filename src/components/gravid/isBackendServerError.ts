import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationResponse from '../../api/ValidationResponse';

function isBackendServerError(
  beResponse:
    | lagreGravideBackendError
    | ValidationResponse
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return !(beResponse as ValidationResponse).violations;
}

export default isBackendServerError;
