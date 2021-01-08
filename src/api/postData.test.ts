import postData from './postData';
import RestStatus from './RestStatus';

describe('postData', () => {
  it('should resolve with status 200 if the backend responds with 200', async () => {
    const mockData = {
      mocked: 'OK'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as unknown) as Response)
    );

    expect(await postData('/Path', {})).toEqual({
      status: 200,
      validering: mockData
    });
  });

  it('should reject with status Unauthorized if the backend responds with 401', async () => {
    const mockData = {
      mocked: 'OK'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 401,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as unknown) as Response)
    );

    expect(await postData('/Path', {})).toEqual({
      status: 401,
      validering: mockData
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    const mockData = {
      mocked: 'OK'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 500,
        json: () => Promise.resolve(mockData),
        clone: () => ({
          json: () => Promise.reject('Dette gik galt')
        }),
        text: () => Promise.resolve('Dette gik galt')
      } as unknown) as Response)
    );

    expect(await postData('/Path', {})).toEqual({
      status: 500,
      validering: 'Dette gik galt'
    });
  });

  it('should reject with status Unknown if the backend responds with an unknown response', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 1234,
        json: () => Promise.resolve({})
      } as Response)
    );

    expect(await postData('/Path', {})).toEqual({
      status: RestStatus.Unknown,
      validering: []
    });
  });

  it('should reject with status Timeout if the backend does not respond', async () => {
    jest.useFakeTimers();
    const mockData = {};

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: -33,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as Response)
    );

    const resultat = postData('/Path', {});

    jest.advanceTimersByTime(15000);

    expect(await resultat).toEqual({
      status: RestStatus.Timeout,
      validering: []
    });

    jest.useRealTimers();
  });
});
