import { Status } from './Status';
import { LoginExpiryResponse } from './LoginExpiryResponse';
import { ParseExpiryDate } from './ParseExpiryDate';

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

export const GetLoginExpiry = (basePath: string): Promise<LoginExpiryResponse> => {
  return Promise.race([
    new Promise((resolve, reject) => setTimeout(() => reject('Tidsavbrudd'), 10000))
      .then(() => {
        return {
          status: Status.Timeout
        };
      })
      .catch(() => ({
        status: Status.Timeout
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
        status: Status.Successfully,
        tidspunkt: ParseExpiryDate(json)
      }))
      .catch((status) => ({
        status: status
      }))
  ]);
};
