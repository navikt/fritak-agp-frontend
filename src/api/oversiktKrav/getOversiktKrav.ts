import getRequest from '../fetch/GetHandler';
// import { Paths } from '../../config/Paths';
import { FetchResponse } from '../fetch/FetchResponse';

export default function getOversiktKrav(basePath: string, arbeidsgiverId: string): Promise<FetchResponse> {
  return getRequest(basePath + arbeidsgiverId);
}
