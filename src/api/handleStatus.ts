import RestStatus from './RestStatus';

const handleStatus = (response: Response) => {
  debugger;
  switch (response.status) {
    case 200:
    case 201:
    case 400:
      return response
        .clone()
        .json()
        .catch(() => response.text());
    case RestStatus.Unauthorized:
      return Promise.reject(RestStatus.Unauthorized);
    case 500:
      return response.json();
    default:
      return Promise.reject(RestStatus.Unknown);
  }
};

export default handleStatus;
