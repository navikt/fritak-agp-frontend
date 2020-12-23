import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { defaultKroniskState } from './KroniskState';

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

  it('should set the orgnr to empty', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '456' }
    });
    expect(state.orgnr).toEqual('456');
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

  it('should set fravær', () => {
    let state = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fravær,
      payload: { fravær: { year: 2018, month: 10, dager: 2 } }
    });
    expect(state.fravær?.length).toEqual(1);
    expect(state.fravær!![0].year).toEqual(2018);
    expect(state.fravær!![0].okt).toEqual(2);
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

  it('should validate', () => {
    let state1 = KroniskReducer(defaultKroniskState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    let state2 = KroniskReducer(state1, { type: Actions.Validate });
    expect(state2.fnrError).toBe('Mangler fnr');
    expect(state2.feilmeldinger!!.length).toEqual(1);
    expect(state2.feilmeldinger!![0].feilmelding).toEqual(
      'Fødslesnummer må fylles ut'
    );
    expect(state2.feilmeldinger!![0].skjemaelementId).toEqual('fnr');
    // TODO Mangler validering på alle felter
  });

  it('should reset to defaults', () => {
    let state = KroniskReducer(defaultKroniskState(), { type: Actions.Reset });
    expect(state).toEqual(defaultKroniskState());
    expect(state.fnr).toEqual('');
    expect(state.orgnr).toEqual('');
    expect(state.arbeid?.length).toEqual(0);
    expect(state.påkjenninger?.length).toEqual(0);
    expect(state.kommentar).toEqual('');
    expect(state.fravær?.length).toEqual(0);
    expect(state.progress).toBeUndefined();
    expect(state.validated).toBeUndefined();
    expect(state.kvittering).toBeUndefined();
    expect(state.bekreft).toEqual(false);
    expect(state.fnrError).toBeUndefined();
    expect(state.orgnrError).toBeUndefined();
    expect(state.arbeidError).toBeUndefined();
    expect(state.påkjenningerError).toBeUndefined();
    expect(state.fraværError).toBeUndefined();
    expect(state.bekreftError).toBeUndefined();
    expect(state.kommentarError).toBeUndefined();
    expect(state.dokumentasjonError).toBeUndefined();
    expect(state.feilmeldinger?.length).toEqual(0);
  });
});
