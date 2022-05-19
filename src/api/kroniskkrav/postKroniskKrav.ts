import ValidationResponse from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import { KroniskKravRequest } from './KroniskKravRequest';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const postKroniskKrav = (
  basePath: string,
  request: KroniskKravRequest
): Promise<ValidationResponse<KroniskKravResponse>> => {
  return httpRequest(basePath + Paths.KroniskKrav, request, 'POST');
};

export default postKroniskKrav;
