import { LoginExpiryResponse } from './LoginExpiryResponse';
import { ParseExpiryDate } from './ParseExpiryDate';
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

export const GetLoginExpiry = (basePath: string): Promise<LoginExpiryResponse> => {
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
    fetch(basePath + '/api/v1/login-expiry', {
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
        tidspunkt: ParseExpiryDate(json)
      }))
      .catch((status) => ({
        status: status
      }))
  ]);
};

export default GetLoginExpiry;
