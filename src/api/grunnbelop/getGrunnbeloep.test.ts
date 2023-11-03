import getGrunnbeloep from './getGrunnbeloep';

describe('getGrunnbeloep', () => {
  it('should return status and a string when stuff is OK and it is a time string', async () => {
    const input = {
      dato: '2019-05-01',
      grunnbeloep: 99858,
      grunnbeloepPerMaaned: 8322,
      gjennomsnittPerAar: 98866,
      omregningsfaktor: 1.030707
    };

    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.resolve(mockApi));
    const resultat = await getGrunnbeloep();
    expect(resultat.grunnbeloep).toEqual(input);
  });

  it('should return a status of -2 (Unknown) and empty string when the response is unknown', async () => {
    const mockApi = Promise.resolve({
      status: 402,
      json: () => Promise.resolve()
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const grunnbelop = await getGrunnbeloep();
    expect(grunnbelop.grunnbeloep).toBeUndefined();
    expect(grunnbelop.status).toBe(-2);
  });

  it('should return a status of 401 and empty string when access is denied', async () => {
    const mockApi = Promise.resolve({
      status: 401,
      json: () => Promise.resolve()
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const grunnbelop = await getGrunnbeloep();
    expect(grunnbelop.grunnbeloep).toBeUndefined();
    expect(grunnbelop.status).toBe(401);
  });

  it('should return a status of 401 and empty string when server errors', async () => {
    const mockApi = Promise.resolve({
      status: 500,
      json: () => Promise.resolve()
    } as Response);
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const grunnbelop = await getGrunnbeloep();
    expect(grunnbelop.grunnbeloep).toBeUndefined();
    expect(grunnbelop.status).toBe(500);
  });

  it('should return status and a string when stuff is OK and it is a time string and an isoDate is given', async () => {
    const input = {
      dato: '2019-05-01',
      grunnbeloep: 99858,
      grunnbeloepPerMaaned: 8322,
      gjennomsnittPerAar: 98866,
      omregningsfaktor: 1.030707
    };

    const mockApi = Promise.resolve({
      status: 200,
      json: () => Promise.resolve(input)
    } as Response);
    const fetchSpy = vi.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.resolve(mockApi));
    const resultat = await getGrunnbeloep('2020-01-01');
    expect(resultat.grunnbeloep).toEqual(input);
    expect(fetchSpy).toHaveBeenLastCalledWith('https://g.nav.no/api/v1/grunnbeloep?dato=2020-01-01', {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
      mode: 'cors'
    });
  });
});
