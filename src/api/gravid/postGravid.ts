import ValidationResponse from '../../state/validation/ValidationResponse';
import postRequest from '../postRequest';
import { GravidRequest } from './GravidRequest';
import { Paths } from '../../config/Paths';
import { GravidSoknadResponse } from './GravidSoknadResponse';

const postGravid = (basePath: string, request: GravidRequest): Promise<ValidationResponse<GravidSoknadResponse>> => {
  return postRequest(basePath + Paths.Gravid, request);
};

export default postGravid;
