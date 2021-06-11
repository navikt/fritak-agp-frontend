import postRequest from '../postRequest';
import { Paths } from '../../config/Paths';
import { GravidKravRequest } from './GravidKravRequest';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const postGravidKrav = (basePath: string, request: GravidKravRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.GravidKrav, request);
};

export default postGravidKrav;
