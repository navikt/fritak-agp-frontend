import { validerFravaerMaaned } from './validerFravaerMaaned';

describe('validerFravaerMaaned', () => {
  it('should not allow negative numbers', () => {
    let feil = validerFravaerMaaned(2018, 0, -3);
    expect(feil?.feilmelding).toEqual(
      'Januar 2018 må være mindre enn 31 dager'
    );
  });

  it('should not allow high numbers', () => {
    let feil = validerFravaerMaaned(2018, 0, 32);
    expect(feil?.feilmelding).toEqual(
      'Januar 2018 må være mindre eller lik 31 dager'
    );
  });
});
