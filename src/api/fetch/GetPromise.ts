import HttpStatus from '../HttpStatus';
import { FetchResponse } from './FetchResponse';

export const GetPromise = (path: string) =>
  fetch(path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  }).then((response) => {
    switch (response.status) {
      case HttpStatus.Successfully:
        return {
          status: response.status,
          json: response.json()
        } as FetchResponse;
      case HttpStatus.UnprocessableEntity:
        return response.json();
      default:
        return Promise.reject(response.status);
    }
  });
