import KroniskReducer from './KroniskReducer';
import { Actions, KroniskAction } from './Actions';
import { defaultKroniskState } from './KroniskState';
import ValidationResponse from '../../state/validation/ValidationResponse';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import { languageInit } from '../../locale/languageInit';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';
import Language from '../../locale/Language';

describe('KroniskReducer', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

  const runAction = (action: KroniskAction) => {
    return KroniskReducer(defaultKroniskState(), action, i18n);
  };

  it('should set the fnr', () => {
    let state = runAction({ type: Actions.Fnr, payload: { fnr: '123' } });
    expect(state.fnr).toBe('123');
  });

  it('should set the fnr to empty', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '' }
      },
      i18n
    );
    expect(state.fnr).toBe('');
  });

  it('should set the orgnr', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '456' }
      },
      i18n
    );
    expect(state.orgnr).toBe('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Orgnr
      },
      i18n
    );
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '' }
      },
      i18n
    );
    expect(state.orgnr).toBe('');
  });

  it('should set the antallPerioder to undefined', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.AntallPerioder
      },
      i18n
    );
    expect(state.antallPerioder).toBeUndefined();
  });

  it('should set the antallPerioder to 5', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.AntallPerioder,
        payload: { antallPerioder: 5 }
      },
      i18n
    );
    expect(state.antallPerioder).toBe(5);
  });

  it('should set the bekreft to undefined', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Bekreft
      },
      i18n
    );
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: true }
      },
      i18n
    );
    expect(state.bekreft).toBeTruthy();
  });

  it('should set the bekreft to false', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: false }
      },
      i18n
    );
    expect(state.bekreft).toBeFalsy();
  });

  it('should set the progress to false', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Progress,
        payload: { progress: false }
      },
      i18n
    );
    expect(state.progress).toBeFalsy();
  });

  it('should set the progress to true', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      i18n
    );
    expect(state.progress).toBeTruthy();
  });

  it('should set, update and remove fravær', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '2' } }
      },
      i18n
    );
    let { fravaer } = state;
    expect(fravaer?.length).toBe(1);
    let Aarsfravaer = fravaer!![0];
    expect(Aarsfravaer.year).toBe(2018);
    expect(Aarsfravaer.okt).toBe(2);
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '3' } }
      },
      i18n
    );
    expect(state2.fravaer![0].okt).toBe(3);
    let state3 = KroniskReducer(
      state,
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '' } }
      },
      i18n
    );
    expect(state3.fravaer?.length).toBe(0);
  });

  it('Fravaer - should handle empty state', () => {
    let state = defaultKroniskState();
    state.fravaer = undefined;
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '' } }
      },
      i18n
    );
    expect(state2.fravaer?.length).toBe(0);
  });

  it('Fravaer - should throw error when empty param', () => {
    expect(() => {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.Fravaer,
          payload: {}
        },
        i18n
      );
    }).toThrow();
  });

  it('Fravaer - should throw error when illegal month', () => {
    expect(() => {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.Fravaer,
          payload: { fravaer: { year: 2018, month: 12, dager: '-11' } }
        },
        i18n
      );
    }).toThrow();
    expect(() => {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.Fravaer,
          payload: { fravaer: { year: 2018, month: -1, dager: '-11' } }
        },
        i18n
      );
    }).toThrow();
  });

  it('should set dokumentasjon', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: 'Joda' }
      },
      i18n
    );
    expect(state.dokumentasjon).toBe('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: '' }
      },
      i18n
    );
    expect(state.dokumentasjon).toBe('');
  });

  it('should set progress', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      i18n
    );
    expect(state.progress).toBeTruthy();
  });

  it('should set progress', () => {
    expect(() => {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.Progress,
          payload: {}
        },
        i18n
      );
    }).toThrow();
  });

  it('should set kvittering', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Kvittering,
        payload: { kvittering: true }
      },
      i18n
    );
    expect(state.kvittering).toBeTruthy();
  });

  it('should toggle periodeUnntak', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.ToggleUnntak
      },
      i18n
    );
    expect(state.ikkeHistoriskFravaer).toBeTruthy();

    let state2 = KroniskReducer(
      state,
      {
        type: Actions.ToggleUnntak
      },
      i18n
    );

    expect(state2.ikkeHistoriskFravaer).toBeFalsy();
  });

  it('should set notAuthorized to false', () => {
    let defaultState = defaultKroniskState();
    defaultState.notAuthorized = true;
    let state = KroniskReducer(
      defaultState,
      {
        type: Actions.NotAuthorized
      },
      i18n
    );
    expect(state.notAuthorized).toBeFalsy();
  });

  it('should set serverError to false', () => {
    let defaultState = defaultKroniskState();
    defaultState.serverError = true;
    let state = KroniskReducer(
      defaultState,
      {
        type: Actions.HideServerError
      },
      i18n
    );
    expect(state.serverError).toBeFalsy();
  });

  it('should handle response', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.HandleResponse,
        payload: { response: {} as ValidationResponse<KroniskSoknadResponse> }
      },
      i18n
    );
    expect(state.submitting).toBeFalsy();
    expect(state.progress).toBeFalsy();
    expect(state.validated).toBeFalsy();
  });

  it('should not allow empty response', () => {
    expect(() => {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.HandleResponse,
          payload: {}
        },
        i18n
      );
    }).toThrow();
  });

  it('should validate', () => {
    const expectedFeilmeldinger = [
      {
        feilmelding: 'Mangler fødselsnummer',
        skjemaelementId: '#fnr'
      },
      {
        feilmelding: 'Virksomhetsnummer må fylles ut',
        skjemaelementId: '#orgnr'
      },
      {
        feilmelding: 'Mangler antall fraværsperioder',
        skjemaelementId: '#soknad-perioder'
      },
      {
        feilmelding: 'Bekreft at opplysningene er korrekte',
        skjemaelementId: '#bekreftFeilmeldingId'
      },
      {
        feilmelding: 'Fravær må fylles ut.',
        skjemaelementId: '#fravaer'
      }
    ];
    let state1 = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '' }
      },
      i18n
    );
    let state2 = KroniskReducer(state1, { type: Actions.Validate }, i18n);
    expect(state2.feilmeldinger.length).toBe(5);
    expect(state2.feilmeldinger).toEqual(expectedFeilmeldinger);
  });

  it('should reset to defaults', () => {
    let state = KroniskReducer(defaultKroniskState(), { type: Actions.Reset }, i18n);
    expect(state).toEqual(defaultKroniskState());
    expect(state.fnr).toBeUndefined();
    expect(state.orgnr).toBeUndefined();
    expect(state.fravaer?.length).toBeUndefined();
    expect(state.progress).toBeUndefined();
    expect(state.validated).toBeUndefined();
    expect(state.kvittering).toBeUndefined();
    expect(state.bekreft).toBeUndefined();
    expect(state.fnrError).toBeUndefined();
    expect(state.orgnrError).toBeUndefined();
    expect(state.fravaerError).toBeUndefined();
    expect(state.bekreftError).toBeUndefined();
    expect(state.dokumentasjonError).toBeUndefined();
    expect(state.feilmeldinger.length).toBe(0);
  });
});
