import HttpStatus from './HttpStatus';
import { ValidationResponse } from '../state/validation/ValidationResponse';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const mapViolations = <Type>(status: number, json: any): ValidationResponse<Type> => {
  if (status === HttpStatus.UnprocessableEntity) {
    return {
      status,
      violations: json['violations'] || []
    };
  }
  if (status === HttpStatus.Created) {
    return {
      status,
      violations: [],
      response: json
    };
  }
  return {
    status,
    violations: []
  };
};

const httpRequest = async <Type>(
  path: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  payload: any,
  method: 'POST' | 'DELETE' | 'PATCH',
  timeout = 10000
): Promise<ValidationResponse<Type>> => {
  return Promise.race([
    new Promise<ValidationResponse<Type>>((_, reject) => {
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
      method: method,
      body: JSON.stringify(payload)
    })
      .then(async (response) =>
        mapViolations<Type>(
          response.status,
          response.status === HttpStatus.UnprocessableEntity || response.status === HttpStatus.Created
            ? await response.json()
            : {}
        )
      )
      .catch(() => {
        return {
          status: HttpStatus.Error,
          violations: []
        };
      })
  ]);
};

export default httpRequest;
