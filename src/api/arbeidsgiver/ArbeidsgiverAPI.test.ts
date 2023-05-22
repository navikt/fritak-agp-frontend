import ArbeidsgiverAPI from './ArbeidsgiverAPI';
import ArbeidsgiverStatus from '../../context/arbeidsgiver/ArbeidsgiverStatus';
import testBackendOrganisasjoner from '../../mock/testBackendOrganisasjoner';

describe('ArbeidsgiverAPI', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  it('skal returnere arbeidsgivere', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(testBackendOrganisasjoner)
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
    const result = await ArbeidsgiverAPI.GetArbeidsgivere('dummy');
    expect(result.status).toEqual(200);
    expect(result.organisasjoner.length).toEqual(7);
    expect(result.organisasjoner[0].Name).toEqual('ANSTENDIG BJØRN KOMMUNE');
    expect(result.organisasjoner[0].OrganizationForm).toEqual('KOMM');
    expect(result.organisasjoner[0].OrganizationNumber).toEqual('810007672');
    expect(result.organisasjoner[0].ParentOrganizationNumber).toEqual('');
    expect(result.organisasjoner[0].Status).toEqual('Active');
    expect(result.organisasjoner[0].Type).toEqual('Enterprise');
  });

  it('skal håndtere 401', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 401,
      json: () =>
        Promise.resolve({
          testBackendOrganisasjoner
        })
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
    expect(await ArbeidsgiverAPI.GetArbeidsgivere('')).toStrictEqual({
      status: 401,
      organisasjoner: []
    });
  });

  it('skal håndtere 500', async () => {
    const mockError = Promise.resolve({
      status: 500,
      json: () => Promise.resolve({})
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockError);
    expect(await ArbeidsgiverAPI.GetArbeidsgivere('')).toStrictEqual({
      status: 500,
      organisasjoner: []
    });
  });

  it('skal håndtere token invalid', async () => {
    const mockToken = Promise.resolve({
      status: 401,
      json: {}
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockToken);
    expect(await ArbeidsgiverAPI.GetArbeidsgivere('')).toStrictEqual({
      status: 401,
      organisasjoner: []
    });
  });

  it('skal håndtere responser vi ikke har tenkt på enda', async () => {
    const mockToken = Promise.resolve({
      status: 1234,
      json: {}
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockToken);
    expect(await ArbeidsgiverAPI.GetArbeidsgivere('')).toStrictEqual({
      status: -2,
      organisasjoner: []
    });
  });

  it('skal håndtere timeout', async () => {
    jest.useFakeTimers();

    const mockTimeout = Promise.resolve({
      status: -3,
      json: () => Promise.reject({})
    } as Response);

    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockTimeout);
    const verdi = ArbeidsgiverAPI.GetArbeidsgivere('');
    jest.advanceTimersByTime(15000);
    expect(await verdi).toStrictEqual({
      status: ArbeidsgiverStatus.Timeout,
      organisasjoner: []
    });
  });
});
