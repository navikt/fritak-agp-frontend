import ValidationResponse from '../../state/validation/ValidationResponse';
import patchRequest from '../patchRequest';
import { Paths } from '../../config/Paths';
import GravidKravResponse from '../gravidkrav/GravidKravResponse';
import { GravidKravPatch } from '../gravidkrav/mapGravidKravPatch';

const patchGravidKrav = (
  basePath: string,
  kravId: string,
  payload: GravidKravPatch
): Promise<ValidationResponse<GravidKravResponse>> => {
  return patchRequest(basePath + Paths.GravidKravPatch + kravId, payload);
};

export default patchGravidKrav;
