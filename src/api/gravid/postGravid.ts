import ValidationResponse from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { GravidRequest } from './GravidRequest';
import { Paths } from '../../config/Paths';
import { GravidSoknadResponse } from './GravidSoknadResponse';

const postGravid = (basePath: string, request: GravidRequest): Promise<ValidationResponse<GravidSoknadResponse>> => {
  return httpRequest(basePath + Paths.Gravid, request, 'POST');
};

export default postGravid;
