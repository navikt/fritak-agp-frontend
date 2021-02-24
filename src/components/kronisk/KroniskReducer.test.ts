import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { defaultKroniskState } from './KroniskState';
import ArbeidType from './ArbeidType';
import PaakjenningerType from './PaakjenningerType';
import ValidationResponse from '../../api/ValidationResponse';

describe('KroniskReducer', () => {
  it('should set the fnr', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fnr,
      payload: { fnr: '123' }
    });
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '456' }
    });
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Orgnr
    });
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '' }
    });
    expect(state.orgnr).toEqual('');
  });

  it('ToggleArbeid - should set the arbeid state', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.ToggleArbeid,
      payload: { arbeid: ArbeidType.MODERAT }
    });
    expect(state.arbeid).toEqual([ArbeidType.MODERAT]);

    state.arbeid = undefined;
    let state2 = KroniskReducer(state, {
      type: Actions.ToggleArbeid,
      payload: { arbeid: ArbeidType.MODERAT }
    });
    expect(state2.arbeid).toEqual([ArbeidType.MODERAT]);
  });

  it('ToggleArbeid - should handle empty arbeid state', () => {
    let state = defaultKroniskState();
    state.arbeid = undefined;
    let state2 = KroniskReducer(state, {
      type: Actions.ToggleArbeid,
      payload: { arbeid: ArbeidType.MODERAT }
    });
    expect(state2.arbeid).toEqual([ArbeidType.MODERAT]);
  });

  it('ToggleArbeid - should reset the arbeid state', () => {
    const initialState = defaultKroniskState();
    initialState.arbeid = [ArbeidType.MODERAT];
    let state = KroniskReducer(initialState, {
      type: Actions.ToggleArbeid,
      payload: { arbeid: ArbeidType.MODERAT }
    });
    expect(state.arbeid).toEqual([]);
  });

  it('ToggleArbeid - should throw error when arbeid is undefined', () => {
    expect(function () {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.ToggleArbeid
      });
    }).toThrow(new Error('Du må spesifisere arbeidstype'));
  });

  it('ToggleArbeid - should throw error when arbeid is undefined in payload', () => {
    expect(function () {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.ToggleArbeid,
        payload: { arbeid: undefined }
      });
    }).toThrowError(new Error('Du må spesifisere arbeidstype'));
  });

  it('TogglePaakjenninger - should set the ToggleArbeid', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.TogglePaakjenninger,
      payload: { paakjenning: PaakjenningerType.REGELMESSIG }
    });
    expect(state.paakjenninger).toEqual([PaakjenningerType.REGELMESSIG]);
  });

  it('TogglePaakjenninger - should reset the ToggleArbeid', () => {
    const initialState = defaultKroniskState();
    initialState.paakjenninger = [PaakjenningerType.REGELMESSIG];
    let state = KroniskReducer(initialState, {
      type: Actions.TogglePaakjenninger,
      payload: { paakjenning: PaakjenningerType.REGELMESSIG }
    });
    expect(state.paakjenninger).toEqual([]);
  });

  it('TogglePaakjenninger - should set the ToggleArbeid to undefined', () => {
    expect(function () {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.TogglePaakjenninger
      });
    }).toThrow(new Error('Du må spesifisere paakjenning'));
  });

  it('TogglePaakjenninger - should set the ToggleArbeid to undefined med undefined i payload', () => {
    expect(function () {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.TogglePaakjenninger,
        payload: { paakjenning: undefined }
      });
    }).toThrowError(new Error('Du må spesifisere paakjenning'));
  });

  it('TogglePaakjenninger - should handle empty state', () => {
    let state = defaultKroniskState();
    state.paakjenninger = undefined;
    let state2 = KroniskReducer(state, {
      type: Actions.TogglePaakjenninger,
      payload: { paakjenning: PaakjenningerType.REGELMESSIG }
    });
    expect(state2.paakjenninger).toEqual([PaakjenningerType.REGELMESSIG]);
  });

  it('should set the bekreft to undefined', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Bekreft
    });
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Bekreft,
      payload: { bekreft: true }
    });
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Bekreft,
      payload: { bekreft: false }
    });
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Progress,
      payload: { progress: false }
    });
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toEqual(true);
  });

  it('should set, update and remove fravær', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fravaer,
      payload: { fravaer: { year: 2018, month: 9, dager: '2' } }
    });
    let { fravaer } = state;
    expect(fravaer?.length).toEqual(1);
    let Aarsfravaer = fravaer!![0];
    expect(Aarsfravaer.year).toEqual(2018);
    expect(Aarsfravaer.okt).toEqual(2);
    let state2 = KroniskReducer(state, {
      type: Actions.Fravaer,
      payload: { fravaer: { year: 2018, month: 9, dager: '3' } }
    });
    expect(state2.fravaer![0].okt).toEqual(3);
    let state3 = KroniskReducer(state, {
      type: Actions.Fravaer,
      payload: { fravaer: { year: 2018, month: 9, dager: '' } }
    });
    expect(state3.fravaer?.length).toEqual(0);
  });

  it('Fravaer - should handle empty state', () => {
    let state = defaultKroniskState();
    state.fravaer = undefined;
    let state2 = KroniskReducer(state, {
      type: Actions.Fravaer,
      payload: { fravaer: { year: 2018, month: 9, dager: '' } }
    });
    expect(state2.fravaer?.length).toEqual(0);
  });

  it('Fravaer - should throw error when empty param', () => {
    expect(() => {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.Fravaer,
        payload: {}
      });
    }).toThrow();
  });

  it('Fravaer - should throw error when illegal month', () => {
    expect(() => {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 12, dager: '-11' } }
      });
    }).toThrow();
    expect(() => {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: -1, dager: '-11' } }
      });
    }).toThrow();
  });

  it('should set kommentar', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Kommentar,
      payload: { kommentar: 'Nada' }
    });
    expect(state.kommentar).toEqual('Nada');
  });

  it('should set kommentar to undefined', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Kommentar,
      payload: { kommentar: '' }
    });
    expect(state.kommentar).toEqual('');
  });

  it('should set dokumentasjon', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: 'Joda' }
    });
    expect(state.dokumentasjon).toEqual('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: '' }
    });
    expect(state.dokumentasjon).toEqual('');
  });

  it('should set progress', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toEqual(true);
  });

  it('should set progress', () => {
    expect(() => {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.Progress,
        payload: {}
      });
    }).toThrow();
  });

  it('should set kvittering', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Kvittering,
      payload: { kvittering: true }
    });
    expect(state.kvittering).toEqual(true);
  });

  it('should handle response', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.HandleResponse,
      payload: { response: {} as ValidationResponse }
    });
    expect(state.submitting).toEqual(false);
    expect(state.progress).toEqual(false);
    expect(state.validated).toEqual(false);
  });

  it('should not allow empty response', () => {
    expect(() => {
      KroniskReducer(defaultKroniskState(), {
        type: Actions.HandleResponse,
        payload: {}
      });
    }).toThrow();
  });

  it('should validate', () => {
    let state1 = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    let state2 = KroniskReducer(state1, { type: Actions.Validate });
    expect(state2.feilmeldinger.length).toBe(6);
  });

  it('should reset to defaults', () => {
    let state = KroniskReducer(defaultKroniskState(), { type: Actions.Reset });
    expect(state).toEqual(defaultKroniskState());
    expect(state.fnr).toBeUndefined();
    expect(state.orgnr).toBeUndefined();
    expect(state.arbeid?.length).toBeUndefined();
    expect(state.paakjenninger?.length).toBeUndefined();
    expect(state.kommentar).toBeUndefined();
    expect(state.fravaer?.length).toBeUndefined();
    expect(state.progress).toBeUndefined();
    expect(state.validated).toBeUndefined();
    expect(state.kvittering).toBeUndefined();
    expect(state.bekreft).toBeUndefined();
    expect(state.fnrError).toBeUndefined();
    expect(state.orgnrError).toBeUndefined();
    expect(state.arbeidError).toBeUndefined();
    expect(state.paakjenningerError).toBeUndefined();
    expect(state.fravaerError).toBeUndefined();
    expect(state.bekreftError).toBeUndefined();
    expect(state.kommentarError).toBeUndefined();
    expect(state.dokumentasjonError).toBeUndefined();
    expect(state.feilmeldinger.length).toEqual(0);
  });
});
