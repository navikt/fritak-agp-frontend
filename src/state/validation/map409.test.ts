import map409 from './map409';

describe('map409', () => {
  it('should set the correct state', () => {
    const expected = {
      feilmeldinger: [],
      duplicateSubmission: true,
      progress: false
    };

    expect(map409({ feilmeldinger: [] })).toEqual(expected);
  });
});
