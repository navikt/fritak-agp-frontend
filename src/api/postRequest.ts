import RestStatus from './RestStatus';
import ValidationResponse from './ValidationResponse';

export const VALID_RESPONSE_STATUSES = [
  RestStatus.Successfully,
  RestStatus.Created,
  RestStatus.Error,
  RestStatus.BadRequest,
  RestStatus.Unauthorized,
  RestStatus.UnprocessableEntity
];

export const findStatus = (status: number): RestStatus => {
  return VALID_RESPONSE_STATUSES.includes(status) ? status : RestStatus.Unknown;
};

const postRequest = async (
  path: string,
  payload: any,
  timeout: number = 10000
): Promise<ValidationResponse> => {
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
    }).then((response) => {
      return response.json().then((data) => {
        return {
          status: findStatus(response.status),
          violations: []
        };
      });
    })
  ]);
};

export default postRequest;
