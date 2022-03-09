import ValidationResponse from '../../state/validation/ValidationResponse';
import patchRequest from '../patchRequest';
import { Paths } from '../../config/Paths';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const patchKroniskKrav = (
  basePath: string,
  kravId: string,
  payload: any
): Promise<ValidationResponse<KroniskKravResponse>> => {
  return patchRequest(basePath + Paths.KroniskKravSlett + kravId, payload);
};

export default patchKroniskKrav;
