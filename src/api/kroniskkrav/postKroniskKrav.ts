import ValidationResponse from '../../state/validation/ValidationResponse';
import postRequest from '../postRequest';
import { Paths } from '../../config/Paths';
import { KroniskKravRequest } from './KroniskKravRequest';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const postKroniskKrav = (
  basePath: string,
  request: KroniskKravRequest
): Promise<ValidationResponse<KroniskKravResponse>> => {
  return postRequest(basePath + Paths.KroniskKrav, request);
};

export default postKroniskKrav;
