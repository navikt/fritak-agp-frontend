import RestStatus from './RestStatus';

const handleStatus = (response: Response) => {
  switch (response.status) {
    case 200:
      return response
        .clone()
        .json()
        .catch(() => response.text());
    case RestStatus.Unauthorized:
      return Promise.reject(RestStatus.Unauthorized);
    case 400:
      return response
        .clone()
        .json()
        .catch(() => response.text());

    case 500:
      return response.json();
    // return Promise.reject(RestStatus.Error);
    default:
      return Promise.reject(RestStatus.Unknown);
  }
};

export default handleStatus;
