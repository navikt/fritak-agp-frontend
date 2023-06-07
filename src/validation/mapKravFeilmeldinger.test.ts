import mockValidationResponse from '../mockData/mockValidationResponse';
import { defaultKroniskKravState } from '../components/kroniskkrav/KroniskKravState';
import mapKroniskKravFeilmeldinger from './mapKravFeilmeldinger';

import * as uuid from 'uuid';
jest.mock('uuid');

describe('mapKroniskKravFeilmeldinger', () => {
  const ALLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'perioder[0].perioder[0].fom',
    'perioder[0].perioder[0].tom',
    'perioder[0].antallDagerMedRefusjon',
    'perioder[0].månedsinntekt',
    'perioder[0].gradering',
    'bekreftet',
    'perioder',
    'antallDager'
  ];

  const ALLE_GAMLE_FELTER = [
    'identitetsnummer',
    'virksomhetsnummer',
    'perioder[0].fom',
    'perioder[0].tom',
    'perioder[0].antallDagerMedRefusjon',
    'perioder[0].månedsinntekt',
    'perioder[0].gradering',
    'bekreftet',
    'perioder',
    'antallDager'
  ];

  it('should map all violations - nytt format', () => {
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).toBe('feil');
    expect(state.orgnrError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    const fraError = state?.perioder[0]?.perioder[0]?.fomError || '';
    expect(fraError).toBe('feil');
    // const tilError = state?.perioder ? state?.perioder[0]?.tomError : '';
    // expect(tilError).toBe('feil');
    const dagerError = state?.perioder ? state?.perioder[0]?.dagerError : '';
    expect(dagerError).toBe('feil');
    const belopError = state?.perioder ? state?.perioder[0]?.belopError : '';
    expect(belopError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    expect(state.antallDagerError).toBe('feil');

    expect(feilmeldinger.length).toEqual(10);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra-dato-0-0');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til-dato-0-0');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager-0');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep-0');
    expect(feilmeldinger[6].skjemaelementId).toEqual('sykemeldingsgrad-0');
    expect(feilmeldinger[7].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[8].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[9].skjemaelementId).toEqual('kontrollsporsmaal-lonn-arbeidsdager');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });

  it('should map all violations - gammelt format', () => {
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, ALLE_GAMLE_FELTER, 'feil'), state);

    expect(state.fnrError).toBe('feil');
    expect(state.orgnrError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    const fraError = state?.perioder[0]?.perioder[0]?.fomError || '';
    expect(fraError).toBe('feil');
    const tilError = state?.perioder[0]?.perioder[0]?.tomError || '';
    expect(tilError).toBe('feil');
    const dagerError = state?.perioder ? state?.perioder[0]?.dagerError : '';
    expect(dagerError).toBe('feil');
    const belopError = state?.perioder ? state?.perioder[0]?.belopError : '';
    expect(belopError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    expect(state.antallDagerError).toBe('feil');

    expect(feilmeldinger.length).toEqual(10);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra-dato-0-0');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til-dato-0-0');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager-0');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep-0');
    expect(feilmeldinger[6].skjemaelementId).toEqual('sykemeldingsgrad-0');
    expect(feilmeldinger[7].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[8].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[9].skjemaelementId).toEqual('kontrollsporsmaal-lonn-arbeidsdager');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });

  it('should handle strange stuff from the backend - antallDagerMedRefusjon', () => {
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

  it('should handle missing message from the backend  - antallDagerMedRefusjon', () => {
    const felter = ['perioder[0].antallDagerMedRefusjon'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].dagerError).toBe('Antall dager med refusjon er høyere enn antall dager i perioden');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager-0');
  });

  it('should handle strange stuff from the backend - fom', () => {
    const felter = ['perioder[1].perioder[0].fom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].perioder[0].fomError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger).toEqual([{ feilmelding: 'feil', skjemaelementId: 'fra-dato-1-0' }]);
  });

  it('should handle missing message from the backend  - fom', () => {
    const felter = ['perioder[0].fom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].perioder[0].fomError).toBe('Fra dato kan ikke være etter til dato');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('fra-dato-0-0');
  });

  it('should handle strange stuff from the backend - tom', () => {
    const felter = ['perioder[1].tom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].tomError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('til-dato-1-0');
  });

  it('should handle missing message from the backend  - tom', () => {
    const felter = ['perioder[0].perioder[0].tom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].tomError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('til-dato-0-0');
  });

  it('should handle strange stuff from the backend - månedsinntekt', () => {
    const felter = ['perioder[1].månedsinntekt'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].belopError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('beloep-1');
  });

  it('should handle missing message from the backend  - månedsinntekt', () => {
    const felter = ['perioder[0].månedsinntekt'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].belopError).toBe('Månedsinntekt mangler');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('beloep-0');
  });

  it('should handle strange stuff from the backend - gradering', () => {
    const felter = ['perioder[1].gradering'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].sykemeldingsgradError).toBeUndefined();
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('sykemeldingsgrad-1');
  });

  it('should handle missing message from the backend  - gradering', () => {
    const felter = ['perioder[0].gradering'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.perioder[0].sykemeldingsgradError).toBe('Sykemeldingsgraden må være mellom 20% og 100%');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('sykemeldingsgrad-0');
  });

  it('should handle strange stuff from the backend - perioder', () => {
    const felter = ['perioder'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.periodeError).toBe('feil');
    //@ts-ignore
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager');
  });

  it('should handle missing message from the backend  - perioder', () => {
    const felter = ['perioder'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager');
  });

  it('should handle strange data from the backend  - propertyPath contains only .', () => {
    const state = defaultKroniskKravState();
    // @ts-ignore
    const feilmeldinger = mapKroniskKravFeilmeldinger({ violations: [{ propertyPath: '.' }], status: 200 }, state);

    expect(feilmeldinger.length).toEqual(0);
  });

  it('should handle too large attachment  - 413 errorcode', () => {
    const uuidSpy = jest.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(413, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toEqual('Vedlegget er for stort, vi har begrenset det til 50 MB.');
  });

  it('should handle missing backend - 404 errorcode', () => {
    const uuidSpy = jest.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(404, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toEqual('Innsendingen feilet');
  });
});
