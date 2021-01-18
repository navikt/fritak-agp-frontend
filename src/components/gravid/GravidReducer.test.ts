import GravidReducer from './GravidReducer';
import { Actions } from './Actions';
import { defaultGravidState } from './GravidState';
import { Tiltak } from './Tiltak';
import ValidationResponse from '../../api/ValidationResponse';
import { Omplassering } from './Omplassering';
import { OmplasseringAarsak } from './OmplasseringAarsak';

describe('GravidReducer', () => {
  it('should set the fnr', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Fnr,
      payload: { fnr: '123' }
    });
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '456' }
    });
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Orgnr
    });
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Orgnr,
      payload: { orgnr: '' }
    });
    expect(state.orgnr).toEqual('');
  });

  it('ToggleTiltak - should set the arbeid state', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.ToggleTiltak,
      payload: { tiltak: Tiltak.HJEMMEKONTOR }
    });
    expect(state.tiltak).toEqual([Tiltak.HJEMMEKONTOR]);
  });

  it('should set the kvittering', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Kvittering,
      payload: { kvittering: true }
    });
    expect(state.kvittering).toBe(true);
  });

  it('should set the progress', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toBe(true);
  });

  it('should set videre', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Videre,
      payload: { videre: true }
    });
    expect(state.videre).toBe(true);
  });

  it('should set the bekreft to undefined', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Bekreft
    });
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Bekreft,
      payload: { bekreft: true }
    });
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Bekreft,
      payload: { bekreft: false }
    });
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Progress,
      payload: { progress: false }
    });
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Progress,
      payload: { progress: true }
    });
    expect(state.progress).toEqual(true);
  });

  it('should set dokumentasjon', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: 'Joda' }
    });
    expect(state.dokumentasjon).toEqual('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Dokumentasjon,
      payload: { dokumentasjon: '' }
    });
    expect(state.dokumentasjon).toEqual('');
  });

  it('should validate', () => {
    let state1 = GravidReducer(defaultGravidState(), {
      type: Actions.Fnr,
      payload: { fnr: '' }
    });
    let state2 = GravidReducer(state1, { type: Actions.Validate });
    expect(state2.validated).toBe(true);
  });

  it('should handle response', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.HandleResponse,
      payload: { response: {} as ValidationResponse }
    });
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });
  it('should set omplassering', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Omplassering,
      payload: { omplassering: Omplassering.JA }
    });
    expect(state.omplassering).toEqual(Omplassering.JA);
  });
  it('should set omplasseringAarsak', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.OmplasseringAarsak,
      payload: { omplasseringAarsak: OmplasseringAarsak.MOTSETTER }
    });
    expect(state.omplasseringAarsak).toEqual(OmplasseringAarsak.MOTSETTER);
  });
  it('should set tilrettelegge', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.Tilrettelegge,
      payload: { tilrettelegge: true }
    });
    expect(state.tilrettelegge).toEqual(true);
  });
  it('should set tilrettelegge', () => {
    let state = GravidReducer(defaultGravidState(), {
      type: Actions.TiltakBeskrivelse,
      payload: { tiltakBeskrivelse: 'Joda' }
    });
    expect(state.tiltakBeskrivelse).toEqual('Joda');
  });

  it('should reset to defaults', () => {
    let state = GravidReducer(defaultGravidState(), { type: Actions.Reset });
    expect(state).toEqual(defaultGravidState());
    expect(state.fnr).toEqual('');
    expect(state.orgnr).toEqual('');
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
});
