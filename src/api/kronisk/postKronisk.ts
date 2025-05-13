import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { KroniskRequest } from './KroniskRequest';
import { Paths } from '../../config/Paths';
import KroniskSoknadResponse from './KroniskSoknadResponse';

const postKronisk = (basePath: string, request: KroniskRequest): Promise<ValidationResponse<KroniskSoknadResponse>> => {
  return httpRequest(basePath + Paths.Kronisk, request, 'POST');
};

export default postKronisk;
