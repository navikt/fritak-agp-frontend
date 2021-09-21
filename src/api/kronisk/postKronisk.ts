import ValidationResponse from '../../state/validation/ValidationResponse';
import postRequest from '../postRequest';
import { KroniskRequest } from './KroniskRequest';
import { Paths } from '../../config/Paths';
import KroniskSoknadResponse from './KroniskSoknadResponse';

const postKronisk = (basePath: string, request: KroniskRequest): Promise<ValidationResponse<KroniskSoknadResponse>> => {
  return postRequest(basePath + Paths.Kronisk, request);
};

export default postKronisk;
