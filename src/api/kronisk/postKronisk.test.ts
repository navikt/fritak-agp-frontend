import postKronisk from './postKronisk';
import { KroniskRequest } from './KroniskRequest';
import ArbeidType from '../../components/kronisk/ArbeidType';
import PaakjenningerType from '../../components/kronisk/PaakjenningerType';

describe('postKronisk', () => {
  const mockFetch = (status: number, json: any) => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: status,
        json: () => Promise.resolve(json)
      } as unknown) as Response)
    );
  };

  it('should resolve with status 200 if the backend responds with 200', async () => {
    mockFetch(200, {
      status: 200,
      violations: []
    });
    expect(
      await postKronisk('/Path', {
        orgnr: 'tiltak',
        fnr: '',
        arbeidstyper: [ArbeidType.KREVENDE],
        paakjenningstyper: [PaakjenningerType.ALLERGENER],
        dokumentasjon: 'dokumentasjon'
      } as KroniskRequest)
    ).toEqual({
      status: 200,
      violations: []
    });
  });
});
