import postRequest from '../postRequest';
import { GravidRequest } from './GravidRequest';
import { Paths } from '../../config/Paths';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const postGravid = (basePath: string, request: GravidRequest): Promise<ValidationResponse> => {
  return postRequest(basePath + Paths.Gravid, request);
};

export default postGravid;
