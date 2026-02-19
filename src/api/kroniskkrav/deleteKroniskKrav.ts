import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const deleteKroniskKrav = (basePath: string, kravId: string): Promise<ValidationResponse<KroniskKravResponse>> => {
  return httpRequest(basePath + Paths.KroniskKravSlett + '/' + kravId, null, 'DELETE');
};

export default deleteKroniskKrav;
