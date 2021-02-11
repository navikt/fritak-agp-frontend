import { mapArbeidsgiver } from './mapArbeidsgiver';
import { Status } from './Status';
import { ArbeidsgivereInterface } from './ArbeidsgivereInterface';

const handleStatus = (response: Response) => {
  switch (response.status) {
    case Status.Successfully:
      return response.json();
    case Status.Unauthorized:
      return Promise.reject(Status.Unauthorized);
    case Status.Error:
      return Promise.reject(Status.Error);
    default:
      return Promise.reject(Status.Unknown);
  }
};

const GetArbeidsgivere = (basePath: string): Promise<ArbeidsgivereInterface> => {
  return Promise.race([
    new Promise((resolve, reject) => setTimeout(() => reject('Tidsavbrudd'), 10000))
      .then(() => {
        return {
          status: Status.Timeout,
          organisasjoner: []
        };
      })
      .catch(() => ({
        status: Status.Timeout,
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
        status: Status.Successfully,
        organisasjoner: mapArbeidsgiver(json)
      }))
      .catch((status) => ({
        status: status,
        organisasjoner: []
      }))
  ]);
};

export default { GetArbeidsgivere: GetArbeidsgivere };
