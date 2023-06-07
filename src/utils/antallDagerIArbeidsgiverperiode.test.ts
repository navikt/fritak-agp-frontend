import antallDagerIArbeidsgiverperiode from './antallDagerIArbeidsgiverperiode';

describe('antallDagerIArbeidsgiverperiode', () => {
  it('should return 14', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 14)
      }
    ];

    expect(antallDagerIArbeidsgiverperiode(perioder)).toBe(14);
  });

  it('should return 15', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 7)
      },
      {
        uniqueKey: 'string2',
        fom: new Date(2023, 0, 8),
        tom: new Date(2023, 0, 15)
      }
    ];

    expect(antallDagerIArbeidsgiverperiode(perioder)).toBe(15);
  });

  it('should return 15, with gap', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 0, 1),
        tom: new Date(2023, 0, 7)
      },
      {
        uniqueKey: 'string2',
        fom: new Date(2023, 0, 18),
        tom: new Date(2023, 0, 25)
      }
    ];

    expect(antallDagerIArbeidsgiverperiode(perioder)).toBe(15);
  });

  it('should return 16, with gap', () => {
    const perioder = [
      {
        uniqueKey: 'string',
        fom: new Date(2023, 5, 1),
        tom: new Date(2023, 5, 5)
      },
      {
        uniqueKey: 'string2',
        fom: new Date(2023, 5, 10),
        tom: new Date(2023, 5, 20)
      }
    ];

    expect(antallDagerIArbeidsgiverperiode(perioder)).toBe(16);
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

    expect(antallDagerIArbeidsgiverperiode(perioder)).toBe(14);
  });

  it('should return 0 when input is undefined', () => {
    expect(antallDagerIArbeidsgiverperiode(undefined)).toBe(0);
  });
});
