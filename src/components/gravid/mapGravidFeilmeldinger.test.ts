import { defaultGravidState } from './GravidState';
import mapGravidFeilmeldinger from './mapGravidFeilmeldinger';
import mockValidationResponse from '../../mockData/mockValidationResponse';

describe('mapGravidFeilmeldinger', () => {
  const ALLE_FELTER = [
    'fnr',
    'orgnr',
    'tilrettelegge',
    'tiltak',
    'tiltakBeskrivelse',
    'omplassering',
    'omplasseringAarsak',
    'dokumentasjon',
    'bekreftet'
  ];

  it('should map all violations', () => {
    const state = defaultGravidState();
    const feilmeldinger = mapGravidFeilmeldinger(mockValidationResponse(0, ALLE_FELTER), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.tiltakError).not.toBeUndefined();
    expect(state.tiltakBeskrivelseError).not.toBeUndefined();
    expect(state.omplasseringError).not.toBeUndefined();
    expect(state.omplasseringAarsakError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(9);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('tilrettelegge');
    expect(feilmeldinger[3].skjemaelementId).toEqual('tiltak');
    expect(feilmeldinger[4].skjemaelementId).toEqual('tiltakBeskrivelse');
    expect(feilmeldinger[5].skjemaelementId).toEqual('omplassering');
    expect(feilmeldinger[6].skjemaelementId).toEqual('omplasseringAarsak');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[8].skjemaelementId).toEqual('bekreft');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
