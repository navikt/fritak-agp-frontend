import map201 from './map201';

describe('map201', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      kvittering: true,
      progress: false
    };

    expect(map201({ feilmeldinger: [] })).toEqual(expected);
  });
});
