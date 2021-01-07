import { validerFravaerMaaned } from './validerFravaerMaaned';

describe('validerFravaerMaaned', () => {
  it('should not allow negative numbers', () => {
    let feil = validerFravaerMaaned(2018, 0, -3);
    expect(feil?.feilmelding).toEqual('Januar må være 0 eller mer');
  });

  it('should not allow high numbers', () => {
    let feil = validerFravaerMaaned(2018, 0, 32);
    expect(feil?.feilmelding).toEqual('Januar må være mindre enn 31');
  });
});
