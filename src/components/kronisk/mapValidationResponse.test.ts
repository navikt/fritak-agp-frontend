import KroniskReducer from './KroniskReducer';
import { defaultKroniskState } from './KroniskState';
import { Actions } from './Actions';
import { mapValidationResponse } from './mapValidationResponse';
import ValidationResponse from '../../api/ValidationResponse';

describe('mapValidationResponse', () => {
  let defaultState = KroniskReducer(defaultKroniskState(), {
    type: Actions.Reset
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
    let response = {
      violations: [
        {
          validationType: '',
          message: 'Her kommer en feilmelding',
          propertyPath: 'fnr',
          invalidValue: true
        }
      ],
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
    expect(state.fnrError).toEqual('Her kommer en feilmelding');
    expect(state.feilmeldinger?.length).toEqual(1);
    expect(state!.feilmeldinger![0].skjemaelementId).toEqual('fnr');
    expect(state!.feilmeldinger![0].feilmelding).toEqual(
      'Her kommer en feilmelding'
    );
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
      expect(state!.feilmeldinger![0].skjemaelementId).toEqual('ukjent');
      expect(state!.feilmeldinger![0].feilmelding).toEqual(
        'Klarte ikke å sende inn skjema. Prøv igjen senere.'
      );
    });
  });
});
