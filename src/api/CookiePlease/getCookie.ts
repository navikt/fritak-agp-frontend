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

export const getCookie = (): Promise<any> => {
  const grunnbeloepUrl = '/local/cookie-please?subject=10107400090';

  return Promise.race([
    new Promise((_, reject) => setTimeout(() => reject('Tidsavbrudd'), 10000))
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
      .then(() => ({
        status: HttpStatus.Successfully
      }))
      .catch((status) => ({
        status: status
      }))
  ]);
};

export default getCookie;
