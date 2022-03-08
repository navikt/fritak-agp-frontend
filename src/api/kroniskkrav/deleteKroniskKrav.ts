import ValidationResponse from '../../state/validation/ValidationResponse';
import deleteRequest from '../deleteRequest';
import { Paths } from '../../config/Paths';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

const deleteKroniskKrav = (basePath: string, kravId: string): Promise<ValidationResponse<KroniskKravResponse>> => {
  return deleteRequest(basePath + Paths.KroniskKravSlett + kravId);
};

export default deleteKroniskKrav;
