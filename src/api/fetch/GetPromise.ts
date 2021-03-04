import HttpStatus from '../HttpStatus';
import { FetchResponse } from './FetchResponse';

const GetPromise = (path: string) =>
  fetch(path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  }).then(async (response) => {
    switch (response.status) {
      case HttpStatus.Successfully:
        return {
          status: response.status,
          json: await response.json()
        } as FetchResponse;
      case HttpStatus.UnprocessableEntity:
        return response.json();
      default:
        return Promise.reject(response.status);
    }
  });

export default GetPromise;
