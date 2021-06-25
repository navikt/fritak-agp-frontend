import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultKroniskState } from './KroniskState';
import mapKroniskFeilmeldinger from './mapKroniskFeilmeldinger';

describe('mapKroniskFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'kommentar',
    'arbeidstyper',
    'paakjenningstyper',
    'bekreftet',
    'dokumentasjon',
    'fravaer'
  ];

  it('should map all violations', () => {
    const state = defaultKroniskState();
    const feilmeldinger = mapKroniskFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.arbeidError).not.toBeUndefined();
    expect(state.paakjenningerError).not.toBeUndefined();
    expect(state.kommentarError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();
    expect(state.fravaerError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(8);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('kommentar');
    expect(feilmeldinger[3].skjemaelementId).toEqual('arbeidsutfører');
    expect(feilmeldinger[4].skjemaelementId).toEqual('paakjenninger');
    expect(feilmeldinger[5].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[6].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[7].skjemaelementId).toEqual('fravaer');

    for (let i = 0; i < 8; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
