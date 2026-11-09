import beregnRefusjon from './beregnRefusjon';
import type { KravPeriodeData } from '../../../state/KravPeriodeData';

describe('beregnRefusjon', () => {
  it('should return a nicely formated number', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 123,
      dager: 4,
      grunnbeloep: 65000,
      sykemeldingsgrad: '100'
    };
    expect(beregnRefusjon(mockPeriode, 260)).toBe(22.71);
  });

  it('should return an other nicely formated number', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 3456789,
      dager: 12,
      grunnbeloep: 65000
    };
    expect(beregnRefusjon(mockPeriode, 260)).toBe(18000);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 33', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 3456789,
      dager: 12,
      grunnbeloep: 65000,
      sykemeldingsgrad: '33'
    };
    expect(beregnRefusjon(mockPeriode, 260)).toBe(5940);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 33 and beloep = 6789', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 6789,
      dager: 12,
      grunnbeloep: 65000,
      sykemeldingsgrad: '33'
    };
    expect(beregnRefusjon(mockPeriode, 260)).toBe(1240.82);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 77 and beloep = 36789', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 36789,
      dager: 12,
      grunnbeloep: 65000,
      sykemeldingsgrad: '77'
    };
    expect(beregnRefusjon(mockPeriode, 260)).toBe(13860);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 77 and beloep = 14000', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 14000,
      dager: 12,
      grunnbeloep: 65000,
      sykemeldingsgrad: '77'
    };
    expect(beregnRefusjon(mockPeriode, 177)).toBe(8770.17);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 89 and beloep = 14000,5', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 14000.5,
      dager: 17,
      grunnbeloep: 65123,
      sykemeldingsgrad: '89'
    };
    expect(beregnRefusjon(mockPeriode, 177)).toBe(14361.19);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 33 and beloep = 10000', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 10000,
      dager: 17,
      grunnbeloep: 106399,
      sykemeldingsgrad: '33'
    };
    expect(beregnRefusjon(mockPeriode, 123)).toBe(5473.17);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 100 and beloep = 600000', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 600000,
      dager: 17,
      grunnbeloep: 106399,
      sykemeldingsgrad: '100'
    };
    expect(beregnRefusjon(mockPeriode, 123)).toBe(88233.32);
  });

  it('should return an other nicely formated number when sykemeldingsgrad = 50 and beloep = 600000', () => {
    const mockPeriode: KravPeriodeData = {
      uniqueKey: 'unik',
      beloep: 600000,
      dager: 17,
      grunnbeloep: 106399,
      sykemeldingsgrad: '50'
    };
    expect(beregnRefusjon(mockPeriode, 123)).toBe(44116.66);
  });
});
