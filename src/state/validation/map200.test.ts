import map200 from './map200';

describe('map200', () => {
  it('should set the correct state', () => {
    const expected = {
      error: false,
      feilmeldinger: [],
      kvittering: true,
      progress: false,
      serverError: false
    };
    expect(map200({ feilmeldinger: [] })).toEqual(expected);
  });
});
