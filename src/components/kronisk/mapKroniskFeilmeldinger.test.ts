import mockValidationResponse from '../../mockData/mockValidationResponse';
import { defaultKroniskState } from './KroniskState';
import mapKroniskFeilmeldinger from './mapKroniskFeilmeldinger';

import * as uuid from 'uuid';
jest.mock('uuid');

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

    feilmeldinger.forEach((feilmelding) => {
      expect(feilmelding.feilmelding).toEqual('feil');
    });
  });

  it('should handle too large attachment  - 413 errorcode', () => {
    const uuidSpy = jest.spyOn(uuid, 'v4');
    uuidSpy.mockReturnValue('some-uuid');

    const felter = [];
    const state = defaultKroniskState();
    const feilmeldinger = mapKroniskFeilmeldinger(mockValidationResponse(413, felter), state);

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
    const state = defaultKroniskState();
    const feilmeldinger = mapKroniskFeilmeldinger(mockValidationResponse(404, felter), state);

    expect(feilmeldinger.length).toEqual(1);
    //@ts-ignore
    expect(state.periodeError).toBeUndefined();

    expect(feilmeldinger[0].skjemaelementId).toEqual('backend-some-uuid');
    expect(feilmeldinger[0].feilmelding).toEqual('Innsendingen feilet');
  });
});
