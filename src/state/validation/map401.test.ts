import map401 from './map401';

describe('map401', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      notAuthorized: true,
      progress: false
    };

    expect(map401({ feilmeldinger: [] })).toEqual(expected);
  });
});
