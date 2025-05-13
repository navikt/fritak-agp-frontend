import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import { GravidKravRequest } from './GravidKravRequest';
import GravidKravResponse from './GravidKravResponse';

const postGravidKrav = (
  basePath: string,
  request: GravidKravRequest
): Promise<ValidationResponse<GravidKravResponse>> => {
  return httpRequest(basePath + Paths.GravidKrav, request, 'POST');
};

export default postGravidKrav;
