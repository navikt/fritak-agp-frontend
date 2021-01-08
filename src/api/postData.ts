import RestStatus from './RestStatus';

export interface Responsdata {
  status: RestStatus;
  validering: any;
}

const postData = async (
  path: string,
  payload: any,
  timeout: number = 10000
): Promise<Responsdata> => {
  return Promise.race([
    new Promise<Responsdata>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject({ status: RestStatus.Timeout });
      }, timeout);
    }).catch(() => ({
      status: RestStatus.Timeout,
      validering: []
    })),
    fetch(path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(async (params) => {
        switch (params.status) {
          case RestStatus.Successfully:
          case RestStatus.Created:
          case RestStatus.BadRequest:
          case RestStatus.Unauthorized:
          case RestStatus.UnprocessableEntity:
          case RestStatus.Error:
            const returndata = await params
              .clone()
              .json()
              .catch(() => params.text());

            return {
              status: params.status as RestStatus,
              validering: returndata
            };
          default:
            return {
              status: RestStatus.Unknown,
              validering: []
            };
        }
      })
      .catch((status) => ({
        status: status,
        validering: []
      }))
  ]);
};

export default postData;
