import { defaultGravidState } from './GravidState';
import mapGravidFeilmeldinger from './mapGravidFeilmeldinger';
import mockValidationResponse from '../../mockData/mockValidationResponse';

import * as uuid from 'uuid';
vi.mock('uuid');

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
    'bekreftet',
    'termindato'
  ];

  it('should map all violations', () => {
    const state = defaultGravidState();
    const feilmeldinger = mapGravidFeilmeldinger(mockValidationResponse(0, ALLE_FELTER, 'feil'), state);

    expect(state.fnrError).not.toBeUndefined();
    expect(state.orgnrError).not.toBeUndefined();
    expect(state.bekreftError).not.toBeUndefined();
    expect(state.tiltakError).not.toBeUndefined();
    expect(state.tiltakBeskrivelseError).not.toBeUndefined();
    expect(state.omplasseringError).not.toBeUndefined();
    expect(state.omplasseringAarsakError).not.toBeUndefined();
    expect(state.dokumentasjonError).not.toBeUndefined();
    expect(state.termindatoError).not.toBeUndefined();

    expect(feilmeldinger.length).toEqual(10);
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[2].skjemaelementId).toEqual('tilrettelegge');
    expect(feilmeldinger[3].skjemaelementId).toEqual('tiltak');
    expect(feilmeldinger[4].skjemaelementId).toEqual('tiltakBeskrivelse');
    expect(feilmeldinger[5].skjemaelementId).toEqual('omplassering');
    expect(feilmeldinger[6].skjemaelementId).toEqual('omplasseringAarsak');
    expect(feilmeldinger[7].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[8].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[9].skjemaelementId).toEqual('termindato');

    for (let i = 0; i < 10; i++) {
      expect(feilmeldinger[i].feilmelding).toEqual('feil');
    }
  });

  it('should handle too large attachment  - 413 errorcode', () => {
    const uuidSpy = vi.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultGravidState();
    const feilmeldinger = mapGravidFeilmeldinger(mockValidationResponse(413, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    // @ts-expect-error Dette er en test
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toEqual('Vedlegget er for stort, vi har begrenset det til 50 MB.');
  });

  it('should handle missing backend - 404 errorcode', () => {
    const uuidSpy = vi.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultGravidState();
    const feilmeldinger = mapGravidFeilmeldinger(mockValidationResponse(404, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    // @ts-expect-error Dette er en test
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toEqual('Innsendingen feilet');
  });
});
