import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { parseDato } from '../../utils/dato/Dato';
import mapPeriodeData from './mapPeriodeData';

describe('mapPeriodeData', () => {
  it('should map the data', () => {
    const perioder: KroniskKravPeriode[] = [
      {
        fra: parseDato('01.02.2020'),
        fraError: 'error',
        til: parseDato('03.04.2025'),
        tilError: 'error',
        dager: 5,
        dagerError: 'error',
        beloep: 3000,
        uniqueKey: '77-777'
      },
      {
        fra: parseDato('23.02.2020'),
        til: parseDato('24.04.2025'),
        dager: 7,
        beloep: 3500,
        uniqueKey: '77-778'
      }
    ];
    expect(mapPeriodeData(perioder)).toEqual([
      {
        fom: '2020-02-01',
        tom: '2025-04-03',
        antallDagerMedRefusjon: 5,
        månedsinntekt: 3000
      },
      {
        fom: '2020-02-23',
        tom: '2025-04-24',
        antallDagerMedRefusjon: 7,
        månedsinntekt: 3500
      }
    ]);
  });

  it('should map the data even when data is undefined', () => {
    const perioder: KroniskKravPeriode[] = [
      {
        fra: parseDato('01.02.2020'),
        fraError: 'error',
        til: parseDato('03.04.2025'),
        tilError: 'error',
        dager: 5,
        dagerError: 'error',
        beloep: 3000,
        uniqueKey: '77-777'
      },
      {
        fra: parseDato('23.02.2020'),
        til: parseDato('24.04.2025'),
        dager: undefined,
        beloep: undefined,
        uniqueKey: '77-778'
      }
    ];
    expect(mapPeriodeData(perioder)).toEqual([
      {
        fom: '2020-02-01',
        tom: '2025-04-03',
        antallDagerMedRefusjon: 5,
        månedsinntekt: 3000
      },
      {
        fom: '2020-02-23',
        tom: '2025-04-24',
        antallDagerMedRefusjon: 0,
        månedsinntekt: 0
      }
    ]);
  });
});
