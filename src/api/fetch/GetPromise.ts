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
      case HttpStatus.UnprocessableEntity:
        return {
          status: response.status,
          json: await response.json()
        } as FetchResponse;
      default:
        return Promise.reject({
          status: response.status,
          json: {}
        });
    }
  });

export default GetPromise;
