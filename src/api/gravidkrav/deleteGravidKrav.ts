import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import GravidKravResponse from './GravidKravResponse';

const deleteGravidKrav = (basePath: string, kravId: string): Promise<ValidationResponse<GravidKravResponse>> => {
  return httpRequest(basePath + Paths.GravidKrav + '/' + kravId, null, 'DELETE');
};

export default deleteGravidKrav;
