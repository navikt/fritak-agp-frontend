import map500 from './map500';

describe('map500', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      serverError: true,
      progress: false
    };

    expect(map500({ feilmeldinger: [] })).toEqual(expected);
  });
});
