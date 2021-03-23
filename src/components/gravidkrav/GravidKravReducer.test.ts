import GravidKravReducer from './GravidKravReducer';
import { Actions } from './Actions';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import ValidationResponse from '../../state/validation/ValidationResponse';

describe('GravidKravReducer', () => {
  it('should throw error', () => {
    expect(() => {
      GravidKravReducer(defaultGravidKravState(), {
        type: Actions.HandleResponse
      });
    }).toThrow();
  });

  it('should set the fnr', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Fnr,
      payload: { fnr: '123' }
    });
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '456' }
    });
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Orgnr,
      payload: { orgnr: undefined }
    });
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '' }
    });
    expect(state.orgnr).toEqual('');
  });

  it('should set the fra', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Fra,
      payload: { fra: new Date('2020.06.05 12:00:00') }
    });
    expect(state.fra?.value).toEqual('05.06.2020');
  });

  it('should set the fra', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Fra,
      payload: { fra: undefined }
    });
    expect(state.fra?.value).toBeUndefined();
  });

  it('should clear fra when empty payload', () => {
    expect(() => {
      let state: GravidKravState = {
        fra: {
          value: '2020.05.06',
          error: undefined,
          year: 2020,
          month: 5,
          day: 6,
          millis: 1234512344
        },
        feilmeldinger: []
      };

      state = GravidKravReducer(defaultGravidKravState(), {
        type: Actions.Fra,
        payload: { fra: undefined }
      });

      expect(state.fra).toBeUndefined();
    });
  });

  it('should set the til', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Til,
      payload: { til: new Date('2020.06.05 12:00:00') }
    });
    expect(state.til?.value).toEqual('05.06.2020');
  });

  it('should clear til when empty payload', () => {
    let state: GravidKravState = {
      til: {
        value: '2020.05.06',
        error: undefined,
        year: 2020,
        month: 5,
        day: 6,
        millis: 1234512344
      },
      feilmeldinger: []
    };

    state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Til,
      payload: { til: undefined }
    });
    expect(state.til).toBeUndefined();
  });

  it('should set the dager', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Dager,
      payload: { dager: 3 }
    });
    expect(state.dager).toEqual(3);
  });

  it('should set the beløp', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Beloep,
      payload: { beloep: 233 }
    });
    expect(state.beloep).toEqual(233);
  });

  it('should set the kvittering', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Kvittering,
      payload: { kvittering: true }
    });
    expect(state.kvittering).toBe(true);
  });

  it('should set the progress', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toBe(true);
  });

  it('should set the bekreft to undefined', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Bekreft,
      payload: { bekreft: undefined }
    });
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Bekreft,
      payload: { bekreft: true }
    });
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Bekreft,
      payload: { bekreft: false }
    });
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Progress,
      payload: { progress: false }
    });
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toEqual(true);
  });

  it('should set dokumentasjon', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: 'Joda' }
    });
    expect(state.dokumentasjon).toEqual('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: '' }
    });
    expect(state.dokumentasjon).toEqual('');
  });

  it('should validate', () => {
    let state = defaultGravidKravState();
    state = GravidKravReducer(state, {
      type: Actions.Validate
    });
    expect(state.validated).toBe(true);
  });

  it('should handle response', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.HandleResponse,
      payload: { response: {} as ValidationResponse }
    });
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });

  it('should set Grunnbeloep to 345 when grunnbeloep is 14950', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Grunnbeloep,
      payload: { grunnbeloep: 14950 }
    });
    expect(state.gDagsbeloep).toEqual(345);
  });

  it('should set Grunnbeloep to undefined when 0 is given as param', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.Grunnbeloep,
      payload: { grunnbeloep: 0 }
    });
    expect(state.gDagsbeloep).toEqual(undefined);
  });

  it('should set kontrollDager to 345 when grunnbeloep is 14950 and action is KontrollDager', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.KontrollDager,
      payload: { kontrollDager: 14950 }
    });
    expect(state.kontrollDager).toEqual(14950);
  });

  it('should set kontrollDager to 0 when 0 is given as param and action is KontrollDager', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.KontrollDager,
      payload: { kontrollDager: 0 }
    });
    expect(state.kontrollDager).toEqual(0);
  });

  it('should set isOpenKontrollsporsmaalLonn to false when CloseKontrollsporsmaalLonn is action', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.CloseKontrollsporsmaalLonn
    });
    expect(state.isOpenKontrollsporsmaalLonn).toBeFalsy();
  });

  it('should set isOpenKontrollsporsmaalLonn to true when OpenKontrollsporsmaalLonn is action', () => {
    let state = GravidKravReducer(defaultGravidKravState(), {
      type: Actions.OpenKontrollsporsmaalLonn
    });
    expect(state.isOpenKontrollsporsmaalLonn).toBeTruthy();
  });

  it('should reset to defaults', () => {
    let state = GravidKravReducer(defaultGravidKravState(), { type: Actions.Reset });
    expect(state).toEqual(defaultGravidKravState());
    expect(state.fnr).toEqual('');
    expect(state.orgnr).toBeUndefined();
    expect(state.progress).toBeUndefined();
    expect(state.validated).toBeUndefined();
    expect(state.kvittering).toBeUndefined();
    expect(state.bekreft).toEqual(false);
    expect(state.fnrError).toBeUndefined();
    expect(state.orgnrError).toBeUndefined();
    expect(state.bekreftError).toBeUndefined();
    expect(state.dokumentasjonError).toBeUndefined();
    expect(state.feilmeldinger?.length).toEqual(0);
  });

  it('should throw un undefined action', () => {
    GravidKravReducer(defaultGravidKravState(), {
      type: Actions.OpenKontrollsporsmaalLonn
    });
    expect(() => {
      GravidKravReducer(defaultGravidKravState(), {
        // @ts-ignore ts2339
        type: Actions.ThisIsNotAnAction
      });
    }).toThrow();
  });
});
