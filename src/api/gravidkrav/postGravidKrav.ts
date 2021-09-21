import ValidationResponse from '../../state/validation/ValidationResponse';
import postRequest from '../postRequest';
import { Paths } from '../../config/Paths';
import { GravidKravRequest } from './GravidKravRequest';
import GravidKravResponse from './GravidKravResponse';

const postGravidKrav = (
  basePath: string,
  request: GravidKravRequest
): Promise<ValidationResponse<GravidKravResponse>> => {
  return postRequest(basePath + Paths.GravidKrav, request);
};

export default postGravidKrav;
