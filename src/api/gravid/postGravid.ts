import ValidationResponse from '../../state/validation/ValidationResponse';
import postRequest from '../postRequest';
import { GravidRequest } from './GravidRequest';
import { Paths } from '../../config/Paths';

const postGravid = (basePath: string, request: GravidRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.Gravid, request);
};

export default postGravid;
