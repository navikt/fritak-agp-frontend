import { Status } from '../ArbeidsgiverAPI';

export interface LoginExpiryResponse {
  status: number;
  tidspunkt?: Date;
}

export const ParseExpiryDate = (value: string) => new Date(value.substring(0, 23));

const handleStatus = (response: Response) => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:
      return Promise.reject(Status.Unauthorized);
    case 500:
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
