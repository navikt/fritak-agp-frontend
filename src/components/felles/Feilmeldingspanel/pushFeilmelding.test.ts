import { pushFeilmelding } from './pushFeilmelding';
import { FeiloppsummeringFeil } from '../../../validation/mapKravFeilmeldinger';

describe('pushFeilmelding', () => {
  it('should push a feilmelding with a prefixed # id to the array', () => {
    const feilmeldinger: FeiloppsummeringFeil[] = [];
    pushFeilmelding('fnr', 'Fødselsnummer er ugyldig', feilmeldinger);
    expect(feilmeldinger).toHaveLength(1);
    expect(feilmeldinger[0].skjemaelementId).toBe('#fnr');
    expect(feilmeldinger[0].feilmelding).toBe('Fødselsnummer er ugyldig');
  });

  it('should push multiple feilmeldinger to the array', () => {
    const feilmeldinger: FeiloppsummeringFeil[] = [];
    pushFeilmelding('fnr', 'Fødselsnummer mangler', feilmeldinger);
    pushFeilmelding('orgnr', 'Organisasjonsnummer mangler', feilmeldinger);
    expect(feilmeldinger).toHaveLength(2);
    expect(feilmeldinger[0].skjemaelementId).toBe('#fnr');
    expect(feilmeldinger[1].skjemaelementId).toBe('#orgnr');
  });

  it('should append to an existing array without replacing entries', () => {
    const feilmeldinger: FeiloppsummeringFeil[] = [
      { skjemaelementId: '#existing', feilmelding: 'Eksisterende feil' }
    ];
    pushFeilmelding('new-field', 'Ny feil', feilmeldinger);
    expect(feilmeldinger).toHaveLength(2);
    expect(feilmeldinger[0].skjemaelementId).toBe('#existing');
    expect(feilmeldinger[1].skjemaelementId).toBe('#new-field');
  });

  it('should prefix the id with # even when the id is empty', () => {
    const feilmeldinger: FeiloppsummeringFeil[] = [];
    pushFeilmelding('', 'Feil', feilmeldinger);
    expect(feilmeldinger[0].skjemaelementId).toBe('#');
  });

  it('should store the exact feilmelding string', () => {
    const feilmeldinger: FeiloppsummeringFeil[] = [];
    const message = 'Det har oppstått en feil';
    pushFeilmelding('field', message, feilmeldinger);
    expect(feilmeldinger[0].feilmelding).toBe(message);
  });
});
