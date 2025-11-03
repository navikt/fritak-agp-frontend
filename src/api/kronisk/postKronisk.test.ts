import postKronisk from './postKronisk';
import { KroniskRequest } from './KroniskRequest';
import { vi } from 'vitest';

describe('postKronisk', () => {
  const mockFetch = (status: number, json: unknown) => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: status,
        json: () => Promise.resolve(json)
      } as unknown as Response)
    );
  };

  it('should resolve with status 200 if the backend responds with 200', async () => {
    mockFetch(200, {
      status: 200,
      violations: []
    });
    expect(
      await postKronisk('/Paths', {
        virksomhetsnummer: 'tiltak',
        identitetsnummer: '',
        dokumentasjon: 'dokumentasjon'
      } as KroniskRequest)
    ).toEqual({
      status: 200,
      violations: []
    });
  });
});
