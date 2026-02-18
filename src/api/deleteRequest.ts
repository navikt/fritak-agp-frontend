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

const deleteRequest = async <Type>(path: string, timeout = 10000): Promise<ValidationResponse<Type>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'DELETE',
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

export default deleteRequest;
