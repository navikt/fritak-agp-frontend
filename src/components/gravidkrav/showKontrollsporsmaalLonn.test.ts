import GravidKravState from './GravidKravState';
import showKontrollsporsmaalLonn from './showKontrollsporsmaalLonn';

describe('showKontrollsporsmaalLonn', () => {
  it('should return true when belop/dager is higher than gDagsbeloep', () => {
    const stateish: GravidKravState = {
      gDagsbeloep: 1000,
      perioder: [
        {
          uniqueKey: '1',
          beloep: 3000,
          dager: 2
        }
      ],
      feilmeldinger: []
    };

    expect(showKontrollsporsmaalLonn(stateish)).toBeTruthy();
  });

  it('should return false when belop/dager is lover than gDagsbeloep', () => {
    const stateish: GravidKravState = {
      gDagsbeloep: 1000,
      perioder: [
        {
          uniqueKey: '1',
          beloep: 3000,
          dager: 4
        }
      ],
      feilmeldinger: []
    };

    expect(showKontrollsporsmaalLonn(stateish)).toBeFalsy();
  });

  it('should return true when belop/dager is higher than gDagsbeloep, more than one periode', () => {
    const stateish: GravidKravState = {
      gDagsbeloep: 1000,
      perioder: [
        {
          uniqueKey: '1',
          beloep: 6000,
          dager: 4
        },
        {
          uniqueKey: '2',
          beloep: 3000,
          dager: 2
        }
      ],
      feilmeldinger: []
    };

    expect(showKontrollsporsmaalLonn(stateish)).toBeTruthy();
  });

  it('should return false when belop/dager is lover than gDagsbeloep, more than one periode', () => {
    const stateish: GravidKravState = {
      gDagsbeloep: 1000,
      perioder: [
        {
          uniqueKey: '1',
          beloep: 3000,
          dager: 4
        },
        {
          uniqueKey: '2',
          beloep: 1500,
          dager: 2
        }
      ],
      feilmeldinger: []
    };

    expect(showKontrollsporsmaalLonn(stateish)).toBeFalsy();
  });
});
