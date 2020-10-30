import 'whatwg-fetch'; // TODO: Sjekk om denne trenger å være her!

export interface lagreGravideInterface {
  status: number
  responseData: any   // TODO: Tilpass data fra backend
}

export interface lagreGravidesoknadParametere {}

export enum RestStatus {
  NotStarted = -1,
  Started = 1,
  Successfully = 200,
  Unknown = -2,
  Timeout = -3,
  Error = 500,
  Unauthorized = 401
}

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

const lagreGravidesoknad = (
  basePath: string,
  payload: lagreGravidesoknadParametere
): Promise<lagreGravideInterface> => {
  return Promise.race([
    new Promise<lagreGravideInterface>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject({ status: RestStatus.Timeout });
      }, 10000);
    }).catch(() => ({
      status: RestStatus.Timeout,
      responseData: []
    })),
    fetch(basePath + '/api/v1/arbeidsgivere', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(handleStatus)
      .then((json) => ({
        status: RestStatus.Successfully,
        responseData: json
      }))
      .catch((status) => ({
        status: status,
        responseData: []
      }))
  ]);
};

export default lagreGravidesoknad;
