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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: method,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    return mapViolations<Type>(
      response.status,
      response.status === HttpStatus.UnprocessableEntity || response.status === HttpStatus.Created
        ? await response.json()
        : {}
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        status: HttpStatus.Timeout,
        violations: []
      };
    }

    return {
      status: HttpStatus.Error,
      violations: []
    };
  } finally {
    clearTimeout(timeoutId);
  }
};

export default httpRequest;
