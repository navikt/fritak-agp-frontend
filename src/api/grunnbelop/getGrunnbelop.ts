import { grunnbelopResponse } from './grunnbelopResponse';
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

export const getGrunnbelop = (): Promise<grunnbelopResponse> => {
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
    fetch(environment.grunnbelopUrl, {
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

export default getGrunnbelop;
