import httpRequest from './httpRequest';
import HttpStatus from './HttpStatus';
import mockFetch from '../mockData/mockFetch';
import { GravidSoknadResponse } from './gravid/GravidSoknadResponse';
import { vi } from 'vitest';

describe('httpRequest', () => {
  interface PostResponse {
    hello: string;
  }

  it('should respond json when 201', async () => {
    mockFetch(201, { hello: 'World' } as PostResponse);
    expect(await httpRequest<PostResponse>('/Path', {}, 'POST')).toEqual({
      status: 201,
      response: { hello: 'World' },
      violations: []
    });
  });

  it('should catch BadRequest', async () => {
    mockFetch(400, {});
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 400,
      violations: []
    });
  });

  it('should catch exceptions', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.reject());
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 500,
      violations: []
    });
  });

  it('should resolve with status 200 if the backend responds with 200', async () => {
    mockFetch(200, {});
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 200,
      violations: []
    });
  });

  it('should reject with status Unauthorized if the backend responds with 401', async () => {
    mockFetch(401, 'You shall not pass!');
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 401,
      violations: []
    });
  });

  it('should reject with status Error if the backend responds with 500', async () => {
    mockFetch(500, 'Backend made booboo!');
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 500,
      violations: []
    });
  });

  it('should reject with status Unknown if the backend responds with an unknown response', async () => {
    mockFetch(505, []);
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 505,
      violations: []
    });
  });

  it('should reject with status Timeout if the backend does not respond', async () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'fetch').mockImplementationOnce((_, init) => {
      const signal = init?.signal;
      return new Promise((_, reject) => {
        if (signal) {
          if (signal.aborted) {
            reject(new DOMException('Aborted', 'AbortError'));
            return;
          }
          signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }
      });
    });
    const resultat = httpRequest('/Path', {}, 'POST');
    vi.advanceTimersByTime(15000);
    expect(await resultat).toEqual({
      status: HttpStatus.Timeout,
      violations: []
    });
    vi.useRealTimers();
  });

  it('should pass on the violation when the server responds with 422', async () => {
    const expected = [
      {
        validationType: 'RefusjonsdagerKanIkkeOverstigePeriodelengdenConstraint',
        message: '',
        propertyPath: 'periode',
        invalidValue: {
          fom: '2021-02-01',
          tom: '2021-02-02',
          antallDagerMedRefusjon: 9,
          beloep: 123.0
        }
      }
    ];

    const response = {
      violations: [
        {
          validationType: 'RefusjonsdagerKanIkkeOverstigePeriodelengdenConstraint',
          message: '',
          propertyPath: 'periode',
          invalidValue: {
            fom: '2021-02-01',
            tom: '2021-02-02',
            antallDagerMedRefusjon: 9,
            beloep: 123.0
          }
        }
      ],
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: 'Valideringen av input feilet',
      status: 422,
      detail: 'Ett eller flere felter har feil.',
      instance: 'about:blank'
    };
    mockFetch(422, response);
    expect(await httpRequest<GravidSoknadResponse>('/Path', {}, 'POST')).toEqual({
      status: 422,
      violations: expected
    });
  });

  it('should return empty violations when 422 response has no violations field', async () => {
    mockFetch(422, { title: 'no violations here' });
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 422,
      violations: []
    });
  });

  it('should return 422 with empty violations when json parsing fails', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 422,
        json: () => Promise.reject(new SyntaxError('bad json'))
      } as unknown as Response)
    );
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 422,
      violations: []
    });
  });

  it('should return 201 with empty response when json parsing fails for Created', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 201,
        json: () => Promise.reject(new SyntaxError('bad json'))
      } as unknown as Response)
    );
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: 201,
      violations: []
    });
  });

  it('should return Error status when fetch rejects with an Error object', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.reject(new Error('Network failure')));
    expect(await httpRequest('/Path', {}, 'POST')).toEqual({
      status: HttpStatus.Error,
      violations: []
    });
  });

  it('should work with DELETE method', async () => {
    mockFetch(200, {});
    expect(await httpRequest('/Path', {}, 'DELETE')).toEqual({
      status: 200,
      violations: []
    });
  });

  it('should work with PATCH method and return 201 response', async () => {
    mockFetch(201, { hello: 'World' } as PostResponse);
    expect(await httpRequest<PostResponse>('/Path', { hello: 'World' }, 'PATCH')).toEqual({
      status: 201,
      response: { hello: 'World' },
      violations: []
    });
  });

  it('should use custom timeout', async () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'fetch').mockImplementationOnce((_, init) => {
      const signal = init?.signal;
      return new Promise((_, reject) => {
        if (signal) {
          if (signal.aborted) {
            reject(new DOMException('Aborted', 'AbortError'));
            return;
          }
          signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }
      });
    });
    const resultat = httpRequest('/Path', {}, 'POST', 2000);
    vi.advanceTimersByTime(3000);
    expect(await resultat).toEqual({
      status: HttpStatus.Timeout,
      violations: []
    });
    vi.useRealTimers();
  });
});
