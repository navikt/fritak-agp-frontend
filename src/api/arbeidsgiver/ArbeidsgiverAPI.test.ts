import ArbeidsgiverAPI from './ArbeidsgiverAPI';
import testBackendOrganisasjoner from '../../mock/testBackendOrganisasjoner';
import { vi } from 'vitest';
import HttpStatus from '../HttpStatus';

describe('ArbeidsgiverAPI', () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it('skal returnere arbeidsgivere', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(testBackendOrganisasjoner)
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
    const result = await ArbeidsgiverAPI.GetArbeidsgivere('dummy');

    expect(result.status).toEqual(HttpStatus.Successfully);
    expect(result.organisasjoner.length).toEqual(1);
    expect(result.organisasjoner[0].navn).toEqual('ANSTENDIG PIGGSVIN BYDEL');

    expect(result.organisasjoner[0].orgnr).toEqual('810007702');

    expect(result.organisasjoner[0].underenheter).toEqual(testBackendOrganisasjoner[1].underenheter);
  });

  it('skal returnere tom liste om det bare er en arbeidsgiver uten underenhet i lista', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            navn: 'ANSTENDIG BJØRN KOMMUNE',
            underenheter: [],
            orgnr: '810007672'
          }
        ])
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
    const result = await ArbeidsgiverAPI.GetArbeidsgivere('dummy');

    expect(result.status).toEqual(HttpStatus.Successfully);
    expect(result.organisasjoner.length).toEqual(0);
  });

  it('skal håndtere 401', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 401,
      json: () =>
        Promise.resolve({
          testBackendOrganisasjoner
        })
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
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
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockError);
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
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockToken);
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
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockToken);
    expect(await ArbeidsgiverAPI.GetArbeidsgivere('')).toStrictEqual({
      status: -2,
      organisasjoner: []
    });
  });

  it('skal håndtere timeout', async () => {
    vi.useFakeTimers();

    const mockTimeout = Promise.resolve({
      status: -3,
      json: () => Promise.reject({})
    } as Response);

    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockTimeout);
    const verdi = ArbeidsgiverAPI.GetArbeidsgivere('');
    vi.advanceTimersByTime(15000);
    expect(await verdi).toStrictEqual({
      status: HttpStatus.Timeout,
      organisasjoner: []
    });
  });

  it('skal håndtere tom liste', async () => {
    const mockArbeidsgivere = Promise.resolve({
      status: 200,
      json: () => Promise.resolve([])
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockArbeidsgivere);
    const result = await ArbeidsgiverAPI.GetArbeidsgivere('dummy');

    expect(result.status).toEqual(HttpStatus.Successfully);
    expect(result.organisasjoner.length).toEqual(0);
  });
});
