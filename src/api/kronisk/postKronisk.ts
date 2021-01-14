import ValidationResponse from '../ValidationResponse';
import postRequest from '../postRequest';
import { KroniskRequest } from './KroniskRequest';

const postKronisk = (
  basePath: string,
  request: KroniskRequest
): Promise<ValidationResponse> => {
  return postRequest(basePath + '/api/v1/kronisk/soeknad', request);
};

export default postKronisk;
