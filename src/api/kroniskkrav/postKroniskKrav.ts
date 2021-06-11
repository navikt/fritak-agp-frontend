import postRequest from '../postRequest';
import { Paths } from '../../config/Paths';
import { KroniskKravRequest } from './KroniskKravRequest';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const postKroniskKrav = (basePath: string, request: KroniskKravRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.KroniskKrav, request);
};

export default postKroniskKrav;
