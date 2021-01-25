import ValidationResponse from '../ValidationResponse';
import postRequest from '../postRequest';
import { Paths } from '../Paths';
import { GravidKravRequest } from './GravidKravRequest';

const postGravidKrav = (basePath: string, request: GravidKravRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.GravidKrav, request);
};

export default postGravidKrav;
