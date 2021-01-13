import postRequest from './postRequest';
import RestStatus from './RestStatus';
import ValidationResponse from './ValidationResponse';

describe('postRequest', () => {
  it('should resolve with status 200 if the backend responds with 200', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () =>
          Promise.resolve({
            status: 200
          } as ValidationResponse)
      } as unknown) as Response)
    );

    expect(await postRequest('/Path', {})).toEqual({
      status: 200,
      violations: []
    });
  });

  it('should reject with status Unauthorized if the backend responds with 401', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 401,
        json: () =>
          Promise.resolve({
            status: 401
          } as ValidationResponse)
      } as unknown) as Response)
    );

    expect(await postRequest('/Path', {})).toEqual({
      status: 401,
      violations: []
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 500,
        json: () =>
          Promise.resolve({
            status: 500
          } as ValidationResponse)
      } as unknown) as Response)
    );

    expect(await postRequest('/Path', {})).toEqual({
      status: 500,
      violations: []
    });
  });

  it('should reject with status Unknown if the backend responds with an unknown response', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 1234,
        json: () =>
          Promise.resolve({
            status: 1234
          } as ValidationResponse)
      } as Response)
    );

    expect(await postRequest('/Path', {})).toEqual({
      status: RestStatus.Unknown,
      violations: []
    });
  });

  it('should reject with status Timeout if the backend does not respond', async () => {
    jest.useFakeTimers();
    const mockData = {};

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: -33,
        json: () => Promise.resolve(mockData)
      } as Response)
    );

    const resultat = postRequest('/Path', {});

    jest.advanceTimersByTime(15000);

    expect(await resultat).toEqual({
      status: RestStatus.Timeout,
      violations: []
    });

    jest.useRealTimers();
  });
});
