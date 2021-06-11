import postRequest from '../postRequest';
import { KroniskRequest } from './KroniskRequest';
import { Paths } from '../../config/Paths';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const postKronisk = (basePath: string, request: KroniskRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.Kronisk, request);
};

export default postKronisk;
