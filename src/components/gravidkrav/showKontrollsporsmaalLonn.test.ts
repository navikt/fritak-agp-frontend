import showKontrollsporsmaalLonn from './showKontrollsporsmaalLonn';

describe('showKontrollsporsmaalLonn', () => {
  it('should return true when belop/dager is higher than gDagsbeloep', () => {
    expect(showKontrollsporsmaalLonn({ gDagsbeloep: 1000, beloep: 3000, dager: 2 })).toBeTruthy();
  });

  it('should return false when belop/dager is lover than gDagsbeloep', () => {
    expect(showKontrollsporsmaalLonn({ gDagsbeloep: 1000, beloep: 3000, dager: 4 })).toBeFalsy();
  });
});
