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
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const grunnbelop = await getGrunnbeloep();
    expect(grunnbelop.grunnbelop).toEqual(input);
  });

  it('should return a status and empty string when endpoint is not found', async () => {
    const mockApi = Promise.resolve({
      status: 402,
      json: () => Promise.resolve()
    } as Response);
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockApi);
    const grunnbelop = await getGrunnbeloep();
    expect(grunnbelop.grunnbelop).toBeUndefined();
  });
});
