import { mapArbeidsgiver } from './mapArbeidsgiver';
import { ArbeidsgivereResponse } from './ArbeidsgivereResponse';
import HttpStatus from '../HttpStatus';

const handleStatus = (response: Response) => {
  switch (response.status) {
    case HttpStatus.Successfully:
      return response.json();
    case HttpStatus.Unauthorized:
      return Promise.reject(HttpStatus.Unauthorized);
    case HttpStatus.Error:
      return Promise.reject(HttpStatus.Error);
    default:
      return Promise.reject(HttpStatus.Unknown);
  }
};

const GetArbeidsgivere = (basePath: string): Promise<ArbeidsgivereResponse> => {
  return Promise.race([
    new Promise((resolve, reject) => setTimeout(() => reject('Tidsavbrudd'), 10000))
      .then(() => {
        return {
          status: HttpStatus.Timeout,
          organisasjoner: []
        };
      })
      .catch(() => ({
        status: HttpStatus.Timeout,
        organisasjoner: []
      })),
    fetch(basePath + '/api/v1/arbeidsgivere', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'GET'
    })
      .then(handleStatus)
      .then((json) => ({
        status: HttpStatus.Successfully,
        organisasjoner: mapArbeidsgiver(json)
      }))
      .catch((status) => ({
        status: status,
        organisasjoner: []
      }))
  ]);
};

export default { GetArbeidsgivere: GetArbeidsgivere };
