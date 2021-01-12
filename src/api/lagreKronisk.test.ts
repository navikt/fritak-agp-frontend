import ArbeidType from '../components/kronisk/ArbeidType';
import PaakjenningerType from '../components/kronisk/PaakjenningerType';
import lagreKronisk, { lagreKroniskParametere } from './lagreKronisk';
import RestStatus from './RestStatus';

describe('lagreKronisk', () => {
  it('should resolve with status 200 if the backend responds with 200', async () => {
    const mockData = {
      mocked: 'OK',
      tiltakBeskrivelse: 'tiltak',
      omplasseringAarsak: 'årsak',
      dokumentasjon: 'dokumentasjon'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as unknown) as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: 200,
      validering: mockData
    });
  });

  it('should adapt the input params', async () => {
    const mockData: lagreKroniskParametere = {
      fnr: '12345678901',
      orgnr: '123456789',
      arbeidstyper: [ArbeidType.KREVENDE],
      paakjenningstyper: [PaakjenningerType.STRESSENDE],
      aarsFravaer: [
        { year: 2019, jan: 4, aug: 5 },
        { year: 2020, sep: 3, nov: 6, des: 7 },
        { year: 2021, jan: 8, feb: 9 }
      ],
      bekreftet: true,
      dokumentasjon: 'base64data',
      paakjenningBeskrivelse: 'Beskrivelse'
    };

    const expectedPath = '/Path/api/v1/kronisk/soeknad';
    const expectedBody = {
      body:
        '{"fnr":"12345678901","orgnr":"123456789","bekreftet":true,"arbeidstyper":["KREVENDE"],"paakjenningstyper":["STRESSENDE"],"fravaer":[{"yearMonth":"2019-01","antallDagerMedFravaer":4},{"yearMonth":"2019-08","antallDagerMedFravaer":5},{"yearMonth":"2020-09","antallDagerMedFravaer":3},{"yearMonth":"2020-11","antallDagerMedFravaer":6},{"yearMonth":"2020-12","antallDagerMedFravaer":7},{"yearMonth":"2021-01","antallDagerMedFravaer":8},{"yearMonth":"2021-02","antallDagerMedFravaer":9}],"dokumentasjon":"base64data","paakjenningBeskrivelse":"Beskrivelse"}',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };

    const fetchSpy = jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as unknown) as Response)
    );

    const response = await lagreKronisk('/Path', mockData);

    expect(fetchSpy).toHaveBeenCalledWith(expectedPath, expectedBody);
  });

  it('should reject with status Unauthorized if the backend responds with 401', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: RestStatus.Unauthorized,
        json: () => Promise.resolve({}),
        clone: () => ({ json: () => Promise.resolve({}) })
      } as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: RestStatus.Unauthorized,
      validering: {}
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    const mockData = { iam: 'happy' };
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 500,
        json: () => Promise.resolve(mockData),
        clone: () => ({ json: () => Promise.resolve(mockData) })
      } as unknown) as Response)
    );

    expect(await lagreKronisk('/Path', {})).toEqual({
      status: RestStatus.Error,
      validering: { iam: 'happy' }
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

    const resultat = lagreKronisk('/Path', {});

    jest.advanceTimersByTime(15000);

    expect(await resultat).toEqual({
      status: RestStatus.Timeout,
      validering: []
    });

    jest.useRealTimers();
  });
});
