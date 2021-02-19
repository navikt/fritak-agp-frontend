import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultGravidKravState } from './GravidKravState';
import mapGravidKravFeilmeldinger from './mapGravidKravFeilmeldinger';

describe('mapGravidKravFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'periode.fom',
    'periode.tom',
    'periode.antallDagerMedRefusjon',
    'periode.beloep',
    'bekreftet',
    'dokumentasjon',
    'periode'
  ];

  it('should map all violations', () => {
    const state = defaultGravidKravState();
    const feilmeldinger = mapGravidKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.fraError).not.toBeUndefined();
    expect(state.tilError).not.toBeUndefined();
    expect(state.dagerError).not.toBeUndefined();
    expect(state.beloepError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();
    expect(state.dagerError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(9);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep');
    expect(feilmeldinger[6].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[8].skjemaelementId).toEqual('dager');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
