import {
  lagreGravideBackendError,
  lagreGravideResponse
} from '../../api/lagreGravidesoknad';

function isBackendServerError(
  beResponse:
    | lagreGravideBackendError
    | lagreGravideResponse
    | lagreGravideBackendError[]
): beResponse is lagreGravideBackendError {
  return (beResponse as lagreGravideBackendError).status === 500;
}

export default isBackendServerError;
