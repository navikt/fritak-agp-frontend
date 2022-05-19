import ValidationResponse from '../../state/validation/ValidationResponse';
import deleteRequest from '../deleteRequest';
import { Paths } from '../../config/Paths';
import GravidKravResponse from './GravidKravResponse';

const deleteGravidKrav = (basePath: string, kravId: string): Promise<ValidationResponse<GravidKravResponse>> => {
  return deleteRequest(basePath + Paths.GravidKrav + '/' + kravId);
};

export default deleteGravidKrav;
