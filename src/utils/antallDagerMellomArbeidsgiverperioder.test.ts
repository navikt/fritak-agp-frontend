import antallDagerMellomArbeidsgiverperioder from './antallDagerMellomArbeidsgiverperioder';

describe('antallDagerMellomArbeidsgiverperioder', () => {
  it('should return 14', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 14)
      }
    ];

    expect(antallDagerMellomArbeidsgiverperioder(perioder)).toBeUndefined();
  });

  it('should return 11', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 7)
      },
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 18),
        tom: new Date(2023, 0, 25)
      }
    ];

    expect(antallDagerMellomArbeidsgiverperioder(perioder)).toEqual([11]);
  });

  it('should return 14 for 3 perioder', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 4)
      },
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 10),
        tom: new Date(2023, 0, 14)
      },
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 20),
        tom: new Date(2023, 0, 24)
      }
    ];

    expect(antallDagerMellomArbeidsgiverperioder(perioder)).toEqual([6, 6]);
  });

  it('should return 0 when input is undefined', () => {
    expect(antallDagerMellomArbeidsgiverperioder(undefined)).toEqual([]);
  });
});
