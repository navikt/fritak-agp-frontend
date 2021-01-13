import lagreKronisk from './lagreKronisk';
import RestStatus from './RestStatus';

describe('lagreKronisk', () => {
  it('should resolve with status 200 if the backend responds with 200', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () =>
          Promise.resolve({
            mocked: 'OK',
            tiltakBeskrivelse: 'tiltak',
            omplasseringAarsak: 'årsak',
            dokumentasjon: 'dokumentasjon'
          })
      } as unknown) as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: 200,
      violations: []
    });
  });

  it('should reject with status Unauthorized if the backend responds with 401', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: RestStatus.Unauthorized,
        json: () => Promise.resolve({})
      } as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: RestStatus.Unauthorized,
      violations: []
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    const mockRequest = { iam: 'happy' };
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 500,
        json: () => Promise.resolve(mockRequest)
      } as unknown) as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: RestStatus.Error,
      violations: []
    });
  });

  it('should reject with status Unknown if the backend responds with an unknown response', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 1234,
        json: () => Promise.resolve({})
      } as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: RestStatus.Unknown,
      violations: []
    });
  });

  it('should reject with status Timeout if the backend does not respond', async () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: -33,
        json: () => Promise.resolve({})
      } as Response)
    );

    const resultat = lagreKronisk('/Path', {});

    jest.advanceTimersByTime(15000);

    expect(await resultat).toEqual({
      status: RestStatus.Timeout,
      violations: []
    });

    jest.useRealTimers();
  });
});
