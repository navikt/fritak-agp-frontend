import HttpStatus from './HttpStatus';
import ValidationResponse from '../state/validation/ValidationResponse';

export const mapViolations = (status: number, json: any): ValidationResponse => ({
  status,
  violations: json['violations'] || []
});

const postRequest = async (path: string, payload: any, timeout: number = 10000): Promise<ValidationResponse> => {
  return Promise.race([
    new Promise<ValidationResponse>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject({ status: HttpStatus.Timeout, violations: [] });
      }, timeout);
    }).catch(() => ({
      status: HttpStatus.Timeout,
      violations: []
    })),
    fetch(path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(async (response) =>
        mapViolations(response.status, response.status === HttpStatus.UnprocessableEntity ? await response.json() : {})
      )
      .catch(() => {
        return {
          status: HttpStatus.Error,
          violations: []
        };
      })
  ]);
};

export default postRequest;
