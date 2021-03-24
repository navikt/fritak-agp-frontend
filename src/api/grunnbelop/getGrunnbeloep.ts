import { GrunnbeloepResponse } from './GrunnbeloepResponse';
import HttpStatus from '../HttpStatus';
import environment from '../../config/environment';

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

export const getGrunnbeloep = (isoDato?: string): Promise<GrunnbeloepResponse> => {
  const grunnbeloepUrl = isoDato ? `${environment.grunnbeloepUrl}?dato=${isoDato}` : environment.grunnbeloepUrl;

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
        grunnbeloep: json
      }))
      .catch((status) => ({
        status: status
      }))
  ]);
};

export default getGrunnbeloep;
