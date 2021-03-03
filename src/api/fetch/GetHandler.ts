import { FetchResponse } from './FetchResponse';
import { GetPromise } from './GetPromise';
import { TimeoutPromise } from './TimeoutPromise';

const GetHandler = (path: string, timeout: number = 10000): Promise<FetchResponse> => {
  return Promise.race([TimeoutPromise(timeout), GetPromise(path)]);
};

export default GetHandler;
