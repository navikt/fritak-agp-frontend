import getRequest from '../fetch/GetHandler';
import { FetchResponse } from '../fetch/FetchResponse';
import environment from '../../config/environment';

export default function getOversiktKrav(basePath: string, arbeidsgiverId: string): Promise<FetchResponse> {
  return getRequest(environment.baseUrl + basePath + arbeidsgiverId);
}
