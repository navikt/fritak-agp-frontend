import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultKroniskKravState } from './KroniskKravState';
import mapKroniskKravFeilmeldinger from './mapKroniskKravFeilmeldinger';

describe('mapKroniskKravFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'perioder[0].fom',
    'perioder[0].tom',
    'perioder[0].antallDagerMedRefusjon',
    'perioder[0].månedsinntekt',
    'bekreftet',
    'perioder',
    'antallDager'
  ];

  it('should map all violations', () => {
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).toBe('feil');
    expect(state.orgnrError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    const fraError = !!state?.perioder ? state?.perioder[0]?.fomError : '';
    expect(fraError).toBe('feil');
    const tilError = !!state?.perioder ? state?.perioder[0]?.tomError : '';
    expect(tilError).toBe('feil');
    const dagerError = !!state?.perioder ? state?.perioder[0]?.dagerError : '';
    expect(dagerError).toBe('feil');
    const beloepError = !!state?.perioder ? state?.perioder[0]?.beloepError : '';
    expect(beloepError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    expect(state.antallDagerError).toBe('feil');

    expect(feilmeldinger.length).toEqual(9);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra-dato-0');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til-dato-0');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager-0');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep-0');
    expect(feilmeldinger[6].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[8].skjemaelementId).toEqual('kontrollsporsmaal-lonn-arbeidsdager');

    for (let i = 0; i < 8; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });

  it('should handle strange stuff from the backend', () => {
    const felter = ['perioder[1].antallDagerMedRefusjon'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].dagerError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager-1');
  });

  it('should handle missing message from the backend', () => {
    const felter = ['perioder[0].antallDagerMedRefusjon'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, undefined), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].dagerError).toBe('Antall dager med refusjon er høyere enn antall dager i perioden');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager-0');
  });
});
