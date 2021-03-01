import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultKroniskKravState } from './KroniskKravState';
import mapKroniskKravFeilmeldinger from './mapKroniskKravFeilmeldinger';

describe('mapKroniskKravFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'periode.fom',
    'periode.tom',
    'periode.antallDagerMedRefusjon',
    'periode.beloep',
    'bekreftet',
    'periode'
  ];

  it('should map all violations', () => {
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER), state);
    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    const fraError = !!state?.perioder ? state?.perioder[2]?.fraError : '';
    expect(fraError).not.toBeUndefined();
    const tilError = !!state?.perioder ? state?.perioder[3]?.tilError : '';
    expect(tilError).not.toBeUndefined();
    const dagerError = !!state?.perioder ? state?.perioder[4]?.dagerError : '';
    expect(dagerError).not.toBeUndefined();
    const beloepError = !!state?.perioder ? state?.perioder[5]?.beloepError : '';
    expect(beloepError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(8);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep');
    expect(feilmeldinger[6].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dager');

    for (let i = 0; i < 8; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });
});
