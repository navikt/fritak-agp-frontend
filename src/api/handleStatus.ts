import RestStatus from './RestStatus';

const handleStatus = (response: Response) => {
  switch (response.status) {
    case 200:
      return response
        .clone()
        .json()
        .catch(() => response.text());
    case 401:
      return Promise.reject(RestStatus.Unauthorized);
    case 400:
      return Promise.reject(response.json());
    case 500:
      return response.json();
    // return Promise.reject(RestStatus.Error);
    default:
      return Promise.reject(RestStatus.Unknown);
  }
};

export default handleStatus;
