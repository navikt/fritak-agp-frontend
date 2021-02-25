import KroniskKravState, { KroniskKravPeriode } from './KroniskKravState';
import showKontrollsporsmaalLonn from './showKontrollsporsmaalLonn';

describe('showKontrollsporsmaalLonn', () => {
  it('should return true when belop/dager is higher than gDagsbeloep', () => {
    const periode = ([
      {
        dager: 2,
        beloep: 2500
      },
      {
        dager: 2,
        beloep: 2500
      }
    ] as unknown) as Array<KroniskKravPeriode>;
    expect(showKontrollsporsmaalLonn({ gDagsbeloep: 1000, perioder: periode } as KroniskKravState)).toBeTruthy();
  });

  it('should return false when belop/dager is lover than gDagsbeloep', () => {
    const periode = ([
      {
        dager: 2,
        beloep: 1500
      },
      {
        dager: 2,
        beloep: 1500
      }
    ] as unknown) as Array<KroniskKravPeriode>;
    expect(showKontrollsporsmaalLonn({ gDagsbeloep: 1000, perioder: periode } as KroniskKravState)).toBeFalsy();
  });
});
