import ValidationResponse from '../ValidationResponse';
import postRequest from '../postRequest';
import { KroniskRequest } from './KroniskRequest';
import { Paths } from '../Paths';

const postKronisk = (
  basePath: string,
  request: KroniskRequest
): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.Kronisk, request);
};

export default postKronisk;
