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
    'fravaer',
    'antallPerioder'
  ];

  it('should map all violations', () => {
    const state = defaultKroniskState();
    const feilmeldinger = mapKroniskFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();
    expect(state.fravaerError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.antallPerioderError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(6);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[3].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[4].skjemaelementId).toEqual('fravaer');
    expect(feilmeldinger[5].skjemaelementId).toEqual('soknad-perioder');

    for (let i = 0; i < 5; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
