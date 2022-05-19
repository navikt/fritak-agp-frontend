import ValidationResponse from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import GravidKravResponse from '../gravidkrav/GravidKravResponse';
import { GravidKravPatch } from '../gravidkrav/mapGravidKravPatch';

const patchGravidKrav = (
  basePath: string,
  kravId: string,
  payload: GravidKravPatch
): Promise<ValidationResponse<GravidKravResponse>> => {
  return httpRequest(basePath + Paths.GravidKravPatch + kravId, payload, 'PATCH');
};

export default patchGravidKrav;
