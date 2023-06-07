import dagerMellomPerioder from './dagerMellomPerioder';
import { GravidKravPeriode } from '../components/gravidkrav/GravidKravState';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

describe('dagerMellomPerioder', () => {
  it('should return 21', () => {
    const perioder: Array<GravidKravPeriode> = [
      {
        uniqueKey: 'string',
        perioder: [
          {
            uniqueKey: 'string',
            fom: new Date(2023, 0, 1),
            tom: new Date(2023, 0, 10)
          },
          {
            uniqueKey: 'string2',
            fom: new Date(2023, 0, 15),
            tom: new Date(2023, 0, 25)
          }
        ]
      },
      {
        uniqueKey: 'string3',
        perioder: [
          {
            uniqueKey: 'string4',
            fom: new Date(2023, 1, 15),
            tom: new Date(2023, 1, 25)
          }
        ]
      }
    ];

    expect(dagerMellomPerioder(perioder)).toEqual([21]);
  });

  it('should return [21, 18]', () => {
    const perioder: Array<GravidKravPeriode> = [
      {
        uniqueKey: 'string',
        perioder: [
          {
            uniqueKey: 'string',
            fom: new Date(2023, 0, 1),
            tom: new Date(2023, 0, 10)
          },
          {
            uniqueKey: 'string2',
            fom: new Date(2023, 0, 15),
            tom: new Date(2023, 0, 25)
          }
        ]
      },
      {
        uniqueKey: 'string3',
        perioder: [
          {
            uniqueKey: 'string4',
            fom: new Date(2023, 1, 15),
            tom: new Date(2023, 1, 25)
          }
        ]
      },
      {
        uniqueKey: 'string3',
        perioder: [
          {
            uniqueKey: 'string4',
            fom: new Date(2023, 2, 15),
            tom: new Date(2023, 2, 25)
          }
        ]
      }
    ];

    expect(dagerMellomPerioder(perioder)).toEqual([21, 18]);
  });
});
