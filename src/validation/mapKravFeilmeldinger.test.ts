import mockValidationResponse from '../mockData/mockValidationResponse';
import { defaultKroniskKravState } from '../components/kroniskkrav/KroniskKravState';
import mapKroniskKravFeilmeldinger from './mapKravFeilmeldinger';

import * as uuid from 'uuid';
vi.mock('uuid');

describe('mapKroniskKravFeilmeldinger', () => {
  const ALLE_FELTER = [
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

  it('should map all violations', () => {
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).toBe('feil');
    expect(state.orgnrError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    const fraError = state?.perioder ? state?.perioder[0]?.fomError : '';
    expect(fraError).toBe('feil');
    const tilError = state?.perioder ? state?.perioder[0]?.tomError : '';
    expect(tilError).toBe('feil');
    const dagerError = state?.perioder ? state?.perioder[0]?.dagerError : '';
    expect(dagerError).toBe('feil');
    const belopError = state?.perioder ? state?.perioder[0]?.belopError : '';
    expect(belopError).toBe('feil');
    expect(state.bekreftError).toBe('feil');
    expect(state.antallDagerError).toBe('feil');

    expect(feilmeldinger.length).toBe(10);
    expect(feilmeldinger[0].skjemaelementId).toBe('fnr');
    expect(feilmeldinger[1].skjemaelementId).toBe('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toBe('fra-dato-0');
    expect(feilmeldinger[3].skjemaelementId).toBe('til-dato-0');
    expect(feilmeldinger[4].skjemaelementId).toBe('dager-0');
    expect(feilmeldinger[5].skjemaelementId).toBe('beloep-0');
    expect(feilmeldinger[6].skjemaelementId).toBe('sykemeldingsgrad-0');
    expect(feilmeldinger[7].skjemaelementId).toBe('bekreft');
    expect(feilmeldinger[8].skjemaelementId).toBe('dager');
    expect(feilmeldinger[9].skjemaelementId).toBe('kontrollsporsmaal-lonn-arbeidsdager');

    for (let i = 0; i < 9; i++) {
      expect(feilmeldinger[i].feilmelding).toBe('feil');
    }
  });

  it('should handle strange stuff from the backend - antallDagerMedRefusjon', () => {
    const felter = ['perioder[1].antallDagerMedRefusjon'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].dagerError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('dager-1');
  });

  it('should handle missing message from the backend  - antallDagerMedRefusjon', () => {
    const felter = ['perioder[0].antallDagerMedRefusjon'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].dagerError).toBe('Antall dager med refusjon er høyere enn antall dager i perioden');
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('dager-0');
  });

  it('should handle strange stuff from the backend - fom', () => {
    const felter = ['perioder[1].fom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].fomError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('fra-dato-1');
  });

  it('should handle missing message from the backend  - fom', () => {
    const felter = ['perioder[0].fom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].fomError).toBe('Fra dato kan ikke være etter til dato');
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('fra-dato-0');
  });

  it('should handle strange stuff from the backend - tom', () => {
    const felter = ['perioder[1].tom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].tomError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('til-dato-1');
  });

  it('should handle missing message from the backend  - tom', () => {
    const felter = ['perioder[0].tom'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].tomError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('til-dato-0');
  });

  it('should handle strange stuff from the backend - månedsinntekt', () => {
    const felter = ['perioder[1].månedsinntekt'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].belopError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('beloep-1');
  });

  it('should handle missing message from the backend  - månedsinntekt', () => {
    const felter = ['perioder[0].månedsinntekt'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].belopError).toBe('Månedsinntekt mangler');
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('beloep-0');
  });

  it('should handle strange stuff from the backend - gradering', () => {
    const felter = ['perioder[1].gradering'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].sykemeldingsgradError).toBeUndefined();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('sykemeldingsgrad-1');
  });

  it('should handle missing message from the backend  - gradering', () => {
    const felter = ['perioder[0].gradering'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[0].sykemeldingsgradError).toBe('Sykemeldingsgraden må være mellom 20% og 100%');
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('sykemeldingsgrad-0');
  });

  it('should handle strange stuff from the backend - perioder', () => {
    const felter = ['perioder'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter, 'feil'), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.periodeError).toBe('feil');
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.perioder[1]).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('dager');
  });

  it('should handle missing message from the backend  - perioder', () => {
    const felter = ['perioder'];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(0, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('dager');
  });

  it('should handle strange data from the backend  - propertyPath contains only .', () => {
    const state = defaultKroniskKravState();
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    const feilmeldinger = mapKroniskKravFeilmeldinger({ violations: [{ propertyPath: '.' }], status: 200 }, state);

    expect(feilmeldinger.length).toBe(0);
  });

  it('should handle too large attachment  - 413 errorcode', () => {
    const uuidSpy = vi.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(413, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toBe('Vedlegget er for stort, vi har begrenset det til 50 MB.');
  });

  it('should handle missing backend - 404 errorcode', () => {
    const uuidSpy = vi.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultKroniskKravState();
    const feilmeldinger = mapKroniskKravFeilmeldinger(mockValidationResponse(404, felter), state);

    expect(feilmeldinger.length).toBe(1);
    //@ts-expect-error  Skal ikke være mulig men tester like vel
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toBe('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toBe('Innsendingen feilet');
  });
});
