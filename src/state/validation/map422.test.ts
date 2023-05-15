import map422 from './map422';

describe('map422', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      kvittering: false,
      progress: false,
      error: false
    };

    expect(map422({ feilmeldinger: [] })).toEqual(expected);
  });
});
