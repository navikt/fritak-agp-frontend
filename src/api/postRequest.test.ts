import postRequest from './postRequest';
import RestStatus from './RestStatus';
import ValidationResponse from './ValidationResponse';

describe('postRequest', () => {
  const mockFetch = (status: number, json: any) => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: status,
        json: () => Promise.resolve(json)
      } as unknown) as Response)
    );
  };

  it('should catch exceptions', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 0,
        json: () => {
          throw new Error();
        }
      } as unknown) as Response)
    );
    expect(await postRequest('/Path', {})).toEqual({
      status: 500,
      violations: []
    });
  });

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
    mockFetch(401, {
      status: 401,
      violations: []
    } as ValidationResponse);
    expect(await postRequest('/Path', {})).toEqual({
      status: 401,
      violations: []
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    mockFetch(500, {
      status: 500,
      violations: []
    } as ValidationResponse);
    expect(await postRequest('/Path', {})).toEqual({
      status: 500,
      violations: []
    });
  });

  it('should reject with status Unknown if the backend responds with an unknown response', async () => {
    mockFetch(1234, {
      status: 1234,
      violations: []
    } as ValidationResponse);
    expect(await postRequest('/Path', {})).toEqual({
      status: RestStatus.Unknown,
      violations: []
    });
  });

  it('should reject with status Timeout if the backend does not respond', async () => {
    jest.useFakeTimers();
    mockFetch(-33, {
      status: -33,
      violations: []
    } as ValidationResponse);
    const resultat = postRequest('/Path', {});
    jest.advanceTimersByTime(15000);
    expect(await resultat).toEqual({
      status: RestStatus.Timeout,
      violations: []
    });
    jest.useRealTimers();
  });
});
