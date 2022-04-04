import { validerFravaerTabell } from './validerFravaerTabell';
import { Aarsfravaer } from './Aarsfravaer';

describe('TabellValidator', () => {
  it('should not allow negative days, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: -3
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil.length).toEqual(1);
  });

  it('should not allow too high days, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: 32
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil.length).toEqual(1);
  });

  it('should not allow february, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      feb: 29
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil.length).toEqual(1);
  });

  it('should not allow negative days, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: -3
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil.length).toEqual(0);
  });

  it('should not allow too high days, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: 32
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil.length).toEqual(0);
  });

  it('should not allow february, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      feb: 29
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil.length).toEqual(0);
  });
});
