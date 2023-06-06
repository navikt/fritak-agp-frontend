import map400 from './map400';

describe('map400', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      serverError: true,
      progress: false
    };

    expect(map400({ feilmeldinger: [] })).toEqual(expected);
  });
});
