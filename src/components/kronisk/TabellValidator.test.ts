import { maxDaysInMonth, validerDag, validerTabell } from './TabellValidator';
import { Årsfravær } from './Årsfravær';

describe('TabellValidator', () => {
  it('should not allow negative numbers', () => {
    let feil = validerDag(2018, 0, -3);
    expect(feil?.feilmelding).toEqual('Januar må være 0 eller mer');
  });

  it('should not allow high numbers', () => {
    let feil = validerDag(2018, 0, 32);
    expect(feil?.feilmelding).toEqual('Januar må være mindre enn 31');
  });

  it('should not allow negative days', () => {
    let liste = new Array<Årsfravær>();
    liste.push({
      year: 2021,
      jan: -3
    } as Årsfravær);
    let feil = validerTabell(liste);
    expect(feil.length).toEqual(1);
  });

  it('should not allow too high days', () => {
    let liste = new Array<Årsfravær>();
    liste.push({
      year: 2021,
      jan: 32
    } as Årsfravær);
    let feil = validerTabell(liste);
    expect(feil.length).toEqual(1);
  });

  it('should not allow february', () => {
    let liste = new Array<Årsfravær>();
    liste.push({
      year: 2021,
      feb: 29
    } as Årsfravær);
    let feil = validerTabell(liste);
    expect(feil.length).toEqual(1);
  });

  it('should return correct maxDaysInMonth', () => {
    expect(maxDaysInMonth(2021, 1)).toEqual(28);
  });
});
