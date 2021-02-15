import { grunnbeloepResponse } from './grunnbeloepResponse';
import HttpStatus from '../HttpStatus';
import environment from '../../environment';

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

export const getGrunnbeloep = (isoDato?: String): Promise<grunnbeloepResponse> => {
  let grunnbeloepUrl = environment.grunnbeloepUrl;
  if (isoDato) {
    grunnbeloepUrl = `${grunnbeloepUrl}?dato=${isoDato}`;
  }

  return Promise.race([
    new Promise((resolve, reject) => setTimeout(() => reject('Tidsavbrudd'), 10000))
      .then(() => {
        return {
          status: HttpStatus.Timeout
        };
      })
      .catch(() => ({
        status: HttpStatus.Timeout
      })),
    fetch(grunnbeloepUrl, {
      credentials: 'include',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(handleStatus)
      .then((json) => ({
        status: HttpStatus.Successfully,
        grunnbelop: json
      }))
      .catch((status) => ({
        status: status
      }))
  ]);
};

export default getGrunnbeloep;
