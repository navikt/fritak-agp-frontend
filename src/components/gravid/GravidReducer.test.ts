import GravidReducer from './GravidReducer';
import { Actions } from './Actions';
import { defaultGravidState } from './GravidState';
import { Tiltak } from './Tiltak';
import ValidationResponse from '../../state/validation/ValidationResponse';
import { Omplassering } from './Omplassering';
import { Aarsak } from './Aarsak';
import timezone_mock from 'timezone-mock';
import { i18n } from 'i18next';
import GravidSoknadResponse from '../../api/gravid/GravidSoknadResponse';

const translationMock = {
  t: (param: any) => param
};

describe('GravidReducer', () => {
  it('should throw error', () => {
    expect(() => {
      GravidReducer(
        defaultGravidState(),
        {
          type: Actions.ToggleTiltak
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
    expect(() => {
      GravidReducer(
        defaultGravidState(),
        {
          type: Actions.OmplasseringForsoek
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
    expect(() => {
      GravidReducer(
        defaultGravidState(),
        {
          type: Actions.OmplasseringAarsak
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
    expect(() => {
      GravidReducer(
        defaultGravidState(),
        {
          type: Actions.HandleResponse
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should set the fnr', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '123' }
      },
      translationMock as unknown as i18n
    );
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '456' }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: undefined }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toEqual('');
  });

  it('ToggleTiltak - should set the arbeid state', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.ToggleTiltak,
        payload: { tiltak: Tiltak.HJEMMEKONTOR }
      },
      translationMock as unknown as i18n
    );
    expect(state.tiltak).toEqual([Tiltak.HJEMMEKONTOR]);

    let state2 = GravidReducer(
      state,
      {
        type: Actions.ToggleTiltak,
        payload: { tiltak: Tiltak.HJEMMEKONTOR }
      },
      translationMock as unknown as i18n
    );
    expect(state2.tiltak).toEqual([]);
  });

  it('should set the kvittering', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Kvittering,
        payload: { kvittering: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.kvittering).toBe(true);
  });

  it('should set the progress', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toBe(true);
  });

  it('should set videre', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Videre,
        payload: { videre: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.videre).toBe(true);
  });

  it('should set the bekreft to undefined', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: undefined }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: false }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Progress,
        payload: { progress: false }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toEqual(true);
  });

  it('should set dokumentasjon', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: 'Joda' }
      },
      translationMock as unknown as i18n
    );
    expect(state.dokumentasjon).toEqual('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.dokumentasjon).toEqual('');
  });

  it('should set termindato', () => {
    timezone_mock.register('Europe/London');
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Termindato,
        payload: { termindato: new Date('2020-10-11 00:00:00') }
      },
      translationMock as unknown as i18n
    );
    expect(state.termindato).toEqual({
      day: 11,
      millis: 1602370800000,
      month: 10,
      value: '11.10.2020',
      year: 2020
    });
  });

  it('should set termindato to be empty', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Termindato,
        payload: { termindato: undefined }
      },
      translationMock as unknown as i18n
    );
    expect(state.termindato).toBeUndefined();
  });

  it('should validate', () => {
    let state = defaultGravidState();
    state = GravidReducer(
      state,
      {
        type: Actions.Validate
      },
      translationMock as unknown as i18n
    );
    expect(state.validated).toBe(true);
  });

  it('should handle response', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.HandleResponse,
        payload: { response: {} as ValidationResponse<GravidSoknadResponse> }
      },
      translationMock as unknown as i18n
    );
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });
  it('should set omplassering', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.OmplasseringForsoek,
        payload: { omplasseringForsoek: Omplassering.JA }
      },
      translationMock as unknown as i18n
    );
    expect(state.omplassering).toEqual(Omplassering.JA);
  });
  it('should set omplasseringAarsak', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.OmplasseringAarsak,
        payload: { omplasseringAarsak: Aarsak.MOTSETTER }
      },
      translationMock as unknown as i18n
    );
    expect(state.omplasseringAarsak).toEqual(Aarsak.MOTSETTER);
  });
  it('should set tilrettelegge', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.Tilrettelegge,
        payload: { tilrettelegge: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.tilrettelegge).toEqual(true);
  });
  it('should set tilrettelegge', () => {
    let state = GravidReducer(
      defaultGravidState(),
      {
        type: Actions.TiltakBeskrivelse,
        payload: { tiltakBeskrivelse: 'Joda' }
      },
      translationMock as unknown as i18n
    );
    expect(state.tiltakBeskrivelse).toEqual('Joda');
  });

  it('should reset to defaults', () => {
    let state = GravidReducer(defaultGravidState(), { type: Actions.Reset }, translationMock as unknown as i18n);
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
