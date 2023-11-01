import mapResponse from './mapResponse';

describe('mapResponse', () => {
  it('should set the correct flags for a 200 response', () => {
    const response = {
      status: 200,
      violations: []
    };
    const expected = {
      error: false,
      feilmeldinger: [],
      kvittering: true,
      progress: false,
      serverError: false
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 201 response', () => {
    const response = {
      status: 201,
      violations: []
    };
    const expected = {
      feilmeldinger: [],
      kvittering: true,
      progress: false
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 400 response', () => {
    const response = {
      status: 400,
      violations: []
    };
    const expected = {
      feilmeldinger: [],
      progress: false,
      serverError: true
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 401 response', () => {
    const response = {
      status: 401,
      violations: []
    };
    const expected = {
      feilmeldinger: [],
      progress: false,
      notAuthorized: true
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 422 response', () => {
    const response = {
      status: 422,
      violations: []
    };
    const expected = {
      feilmeldinger: undefined,
      error: false,
      progress: false,
      kvittering: false
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 500 response', () => {
    const response = {
      status: 500,
      violations: []
    };
    const expected = {
      feilmeldinger: [],
      progress: false,
      serverError: true
    };
    const result = mapResponse(response, { feilmeldinger: [] }, vi.fn());
    expect(result).toEqual(expected);
  });

  it('should set the correct flags for a 404 response', () => {
    const response = {
      status: 404,
      violations: []
    };
    const expected = {
      feilmeldinger: [
        {
          feil: 'feil'
        }
      ],
      progress: false,
      serverError: true
    };
    const mockMapFeilmeldinger = vi.fn().mockReturnValue([{ feil: 'feil' }]);

    const result = mapResponse(response, { feilmeldinger: [] }, mockMapFeilmeldinger);
    expect(result).toEqual(expected);
  });

  it('should not fail on rubish input', () => {
    const response = {
      status: 667,
      violations: []
    };
    const expected = {
      feilmeldinger: []
    };
    const mockMapFeilmeldinger = vi.fn().mockReturnValue([{ feil: 'feil' }]);

    const result = mapResponse(response, { feilmeldinger: [] }, mockMapFeilmeldinger);
    expect(result).toEqual(expected);
  });
});
