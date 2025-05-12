import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const patchKroniskKrav = (
  basePath: string,
  kravId: string,
  payload: any
): Promise<ValidationResponse<KroniskKravResponse>> => {
  return httpRequest(basePath + Paths.KroniskKravSlett + kravId, payload, 'PATCH');
};

export default patchKroniskKrav;
