import { Actions } from './Actions';
import { mapValidationResponse } from './mapValidationResponse';
import ValidationResponse from '../../api/ValidationResponse';
import { defaultGravidKravState } from './GravidKravState';
import GravidKravReducer from './GravidKravReducer';

describe('mapValidationResponse', () => {
  let defaultState = GravidKravReducer(defaultGravidKravState(), {
    type: Actions.Reset
  });

  it('should handle 400', () => {
    let response = {
      status: 400
    } as ValidationResponse;
    const state = mapValidationResponse(response, defaultState);
    expect(state.progress).toEqual(false);
    expect(state.kvittering).toEqual(false);
    expect(state.error).toBeUndefined();
    expect(state.serverError).toEqual(true);
    expect(state.feilmeldinger?.length).toEqual(0);
  });

  it('should handle 401', () => {
    let response = {
      violations: [],
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: '',
      status: 401,
      instance: ''
    } as ValidationResponse;
    const state = mapValidationResponse(response, defaultState);
    expect(state.progress).toEqual(false);
    expect(state.kvittering).toEqual(false);
    expect(state.error).toEqual(true);
    expect(state.feilmeldinger?.length).toEqual(0);
  });

  it('should handle 201', () => {
    let response = {
      violations: [],
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: '',
      status: 201,
      instance: ''
    } as ValidationResponse;
    const state = mapValidationResponse(response, defaultState);
    expect(state.progress).toEqual(false);
    expect(state.kvittering).toEqual(true);
    expect(state.error).toEqual(false);
    expect(state.feilmeldinger?.length).toEqual(0);
  });

  it('should handle 422', () => {
    const felter = [
      'identitetsnummer',
      'virksomhetsnummer',
      'periode.fom',
      'periode.tom',
      'periode.antallDagerMedRefusjon',
      'periode.beloep',
      'dokumentasjon',
      'bekreftet',
      'periode'
    ];
    const violations = felter.map((felt) => {
      return {
        propertyPath: felt,
        message: 'feil',
        validationType: '',
        invalidValue: true
      };
    });
    let response = {
      violations: violations,
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: 'Valideringen av input feilet',
      status: 422,
      detail: 'Ett eller flere felter har feil.',
      instance: 'about:blank'
    } as ValidationResponse;
    const state = mapValidationResponse(response, defaultState);
    expect(state.progress).toEqual(false);
    expect(state.kvittering).toEqual(false);
    expect(state.error).toEqual(false);

    expect(state.fnrError).toEqual('feil');
    expect(state.orgnrError).toEqual('feil');

    expect(state.dokumentasjonError).toEqual('feil');
    expect(state.bekreftError).toEqual('feil');

    const { feilmeldinger } = state;
    expect(feilmeldinger[0].skjemaelementId).toEqual('fnr');
    expect(feilmeldinger[0].feilmelding).toEqual('feil');
    expect(feilmeldinger[1].skjemaelementId).toEqual('orgnr');
    expect(feilmeldinger[1].feilmelding).toEqual('feil');
    expect(feilmeldinger[2].skjemaelementId).toEqual('fra');
    expect(feilmeldinger[2].feilmelding).toEqual('feil');
    expect(feilmeldinger[3].skjemaelementId).toEqual('til');
    expect(feilmeldinger[3].feilmelding).toEqual('feil');
    expect(feilmeldinger[4].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[4].feilmelding).toEqual('feil');
    expect(feilmeldinger[5].skjemaelementId).toEqual('beloep');
    expect(feilmeldinger[5].feilmelding).toEqual('feil');
    expect(feilmeldinger[6].skjemaelementId).toEqual('dokumentasjon');
    expect(feilmeldinger[6].feilmelding).toEqual('feil');
    expect(feilmeldinger[7].skjemaelementId).toEqual('bekreft');
    expect(feilmeldinger[7].feilmelding).toEqual('feil');
    expect(feilmeldinger[8].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[8].feilmelding).toEqual('feil');
  });

  it('should handle 422 for periode error without message', () => {
    const felter = ['periode'];
    const violations = felter.map((felt) => {
      return {
        propertyPath: felt,
        message: '',
        validationType: '',
        invalidValue: true
      };
    });
    let response = {
      violations: violations,
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: 'Valideringen av input feilet',
      status: 422,
      detail: 'Ett eller flere felter har feil.',
      instance: 'about:blank'
    } as ValidationResponse;
    const state = mapValidationResponse(response, defaultState);
    expect(state.progress).toEqual(false);
    expect(state.kvittering).toEqual(false);
    expect(state.error).toEqual(false);

    const { feilmeldinger } = state;

    expect(feilmeldinger[0].skjemaelementId).toEqual('dager');
    expect(feilmeldinger[0].feilmelding).toEqual('Refusjonsdager kan ikke overstige periodelengden');
  });

  it('should handle 500 and unknown status codes', () => {
    const ERRORS = [500, 666];
    ERRORS.forEach((e) => {
      let response = {
        violations: [],
        type: 'urn:nav:helsearbeidsgiver:validation-error',
        title: 'Valideringen av input feilet',
        status: e,
        instance: 'about:blank'
      } as ValidationResponse;
      const state = mapValidationResponse(response, defaultState);
      expect(state.progress).toEqual(false);
      expect(state.kvittering).toEqual(false);
      expect(state.error).toEqual(true);
      expect(state.feilmeldinger?.length).toEqual(1);
      expect(state.feilmeldinger[0].skjemaelementId).toEqual('ukjent');
      expect(state.feilmeldinger[0].feilmelding).toEqual('Klarte ikke å sende inn skjema. Prøv igjen senere.');
    });
  });
});
