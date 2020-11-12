import RestStatus from './RestStatus';

const handleStatus = (response: Response) => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:
      return Promise.reject(RestStatus.Unauthorized);
    case 500:
      return Promise.reject(RestStatus.Error);
    default:
      return Promise.reject(RestStatus.Unknown);
  }
};

export default handleStatus;
