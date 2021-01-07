import { validerFravaerTabell } from './validerFravaerTabell';
import { Aarsfravaer } from './Aarsfravaer';

describe('TabellValidator', () => {
  it('should not allow negative days', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: -3
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste);
    expect(feil.length).toEqual(1);
  });

  it('should not allow too high days', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: 32
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste);
    expect(feil.length).toEqual(1);
  });

  it('should not allow february', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      feb: 29
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste);
    expect(feil.length).toEqual(1);
  });
});
