import { validerFravaerTabell } from './validerFravaerTabell';
import { Aarsfravaer } from './Aarsfravaer';

describe('validerFravaerTabell ', () => {
  it('should not allow negative days, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: -3
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil).toEqual([
      {
        feilmelding: 'Januar 2021 må være mindre enn 31 dager',
        skjemaelementId: '#Januar-2021'
      }
    ]);
    expect(feil.length).toEqual(1);
  });

  it('should not allow too high days, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: 32
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil).toEqual([
      {
        feilmelding: 'Januar 2021 må være mindre eller lik 31 dager',
        skjemaelementId: '#Januar-2021'
      }
    ]);
    expect(feil.length).toEqual(1);
  });

  it('should not allow february, without exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      feb: 29
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, false);
    expect(feil).toEqual([
      {
        feilmelding: 'Februar 2021 må være mindre eller lik 28 dager',
        skjemaelementId: '#Februar-2021'
      }
    ]);
    expect(feil.length).toEqual(1);
  });

  it('should not allow negative days, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: -3
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil).toEqual([
      {
        feilmelding: 'Januar 2021 må være mindre enn 31 dager',
        skjemaelementId: '#Januar-2021'
      },
      {
        feilmelding: 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.',
        skjemaelementId: '#fravaer'
      }
    ]);
    expect(feil.length).toEqual(2);
  });

  it('should not allow too high days, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      jan: 32
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil).toEqual([
      {
        feilmelding: 'Januar 2021 må være mindre eller lik 31 dager',
        skjemaelementId: '#Januar-2021'
      },
      {
        feilmelding: 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.',
        skjemaelementId: '#fravaer'
      }
    ]);
    expect(feil.length).toEqual(2);
  });

  it('should not allow february, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();
    liste.push({
      year: 2021,
      feb: 29
    } as Aarsfravaer);
    let feil = validerFravaerTabell(liste, true);
    expect(feil).toEqual([
      {
        feilmelding: 'Februar 2021 må være mindre eller lik 28 dager',
        skjemaelementId: '#Februar-2021'
      },
      {
        feilmelding: 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.',
        skjemaelementId: '#fravaer'
      }
    ]);
    expect(feil.length).toEqual(2);
  });

  it('should not give an error on empty array, with exceptions', () => {
    let liste = new Array<Aarsfravaer>();

    let feil = validerFravaerTabell(liste, true);
    expect(feil).toEqual([]);
    expect(feil.length).toEqual(0);
  });
});
