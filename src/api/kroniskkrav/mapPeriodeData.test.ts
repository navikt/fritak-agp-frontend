import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { parseDato } from '../../utils/dato/Dato';
import mapPeriodeData, { beregnSykemeldingGradering } from './mapPeriodeData';

describe('mapPeriodeData', () => {
  it('should map the data', () => {
    const perioder: KroniskKravPeriode[] = [
      {
        fom: parseDato('01.02.2020'),
        fomError: 'error',
        tom: parseDato('03.04.2025'),
        tomError: 'error',
        dager: 5,
        dagerError: 'error',
        belop: 3000,
        uniqueKey: '77-777'
      },
      {
        fom: parseDato('23.02.2020'),
        tom: parseDato('24.04.2025'),
        dager: 7,
        sykmeldingsgrad: '50',
        belop: 3500,
        uniqueKey: '77-778'
      }
    ];
    expect(mapPeriodeData(perioder)).toEqual([
      {
        fom: '2020-02-01',
        tom: '2025-04-03',
        gradering: 1,
        antallDagerMedRefusjon: 5,
        månedsinntekt: 3000
      },
      {
        fom: '2020-02-23',
        tom: '2025-04-24',
        gradering: 0.5,
        antallDagerMedRefusjon: 7,
        månedsinntekt: 3500
      }
    ]);
  });

  it('should map the data even when data is undefined', () => {
    const perioder: KroniskKravPeriode[] = [
      {
        fom: parseDato('01.02.2020'),
        fomError: 'error',
        tom: parseDato('03.04.2025'),
        tomError: 'error',
        dager: 5,
        dagerError: 'error',
        belop: 3000,
        uniqueKey: '77-777'
      },
      {
        fom: parseDato('23.02.2020'),
        tom: parseDato('24.04.2025'),
        dager: undefined,
        belop: undefined,
        uniqueKey: '77-778'
      }
    ];
    expect(mapPeriodeData(perioder)).toEqual([
      {
        fom: '2020-02-01',
        tom: '2025-04-03',
        gradering: 1,
        antallDagerMedRefusjon: 5,
        månedsinntekt: 3000
      },
      {
        fom: '2020-02-23',
        tom: '2025-04-24',
        gradering: 1,
        antallDagerMedRefusjon: 0,
        månedsinntekt: 0
      }
    ]);
  });
});

describe('beregnSykemeldingGradering', () => {
  it('Should return 1 when input is missing', () => {
    expect(beregnSykemeldingGradering(undefined)).toBe(1);
  });

  it('should return 0.33 when 33% is given', () => {
    expect(beregnSykemeldingGradering('33%')).toBe(0.33);
  });

  it('should return 0.33 when 33 is given', () => {
    expect(beregnSykemeldingGradering('33')).toBe(0.33);
  });

  it('should return 0.5 when 50% is given', () => {
    expect(beregnSykemeldingGradering('50%')).toBe(0.5);
  });

  it('should return 0.5 when 50 is given', () => {
    expect(beregnSykemeldingGradering('50')).toBe(0.5);
  });

  it('should return 1 when 100% is given', () => {
    expect(beregnSykemeldingGradering('100%')).toBe(1);
  });

  it('should return 1 when 100 is given', () => {
    expect(beregnSykemeldingGradering('100')).toBe(1);
  });

  it('should return 1.27 when 127% is given', () => {
    expect(beregnSykemeldingGradering('127%')).toBe(1.27);
  });

  it('should return 1.27 when 127 is given', () => {
    expect(beregnSykemeldingGradering('127')).toBe(1.27);
  });

  it('should return 1 when ost is given', () => {
    expect(beregnSykemeldingGradering('ost')).toBe(1);
  });
});
