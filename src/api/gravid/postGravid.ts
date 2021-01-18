import ValidationResponse from '../ValidationResponse';
import postRequest from '../postRequest';
import { GravidRequest } from './GravidRequest';

const postKronisk = (
  basePath: string,
  request: GravidRequest
): Promise<ValidationResponse> => {
  return postRequest(basePath + '/api/v1/gravid/soeknad', request);
};

export default postKronisk;
