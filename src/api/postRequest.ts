import RestStatus from './RestStatus';
import ValidationResponse from './ValidationResponse';
import { mapValidationResponse } from './mapValidationResponse';

const postRequest = async (
  path: string,
  payload: any,
  timeout: number = 10000
): Promise<ValidationResponse> => {
  let status = 0;
  return Promise.race([
    new Promise<ValidationResponse>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject({ status: RestStatus.Timeout, violations: [] });
      }, timeout);
    }).catch(() => ({
      status: RestStatus.Timeout,
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
      .then(async (response) => {
        status = response.status;
        return response.json();
      })
      .then((json: any) => {
        return mapValidationResponse(status, json);
      })
      .catch(() => {
        return {
          status: status || RestStatus.Error,
          violations: []
        };
      })
  ]);
};

export default postRequest;
