import KroniskReducer from './KroniskReducer';
import { Actions, KroniskAction } from './Actions';
import { defaultKroniskState } from './KroniskState';
import ArbeidType from './ArbeidType';
import PaakjenningerType from './PaakjenningerType';
import ValidationResponse from '../../state/validation/ValidationResponse';
import i18next from 'i18next';
import { Language } from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from '../../locale/Locales';
import { languageInit } from '../../locale/languageInit';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';

describe('KroniskReducer', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

  const runAction = (action: KroniskAction) => {
    return KroniskReducer(defaultKroniskState(), action, i18n);
  };

  it('should set the fnr', () => {
    let state = runAction({ type: Actions.Fnr, payload: { fnr: '123' } });
    expect(state.fnr).toEqual('123');
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
    expect(state.fnr).toEqual('');
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
    expect(state.orgnr).toEqual('456');
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
    expect(state.orgnr).toEqual('');
  });

  it('ToggleArbeid - should set the arbeid state', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.ToggleArbeid,
        payload: { arbeid: ArbeidType.MODERAT }
      },
      i18n
    );
    expect(state.arbeid).toEqual([ArbeidType.MODERAT]);

    state.arbeid = undefined;
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.ToggleArbeid,
        payload: { arbeid: ArbeidType.MODERAT }
      },
      i18n
    );
    expect(state2.arbeid).toEqual([ArbeidType.MODERAT]);
  });

  it('ToggleArbeid - should handle empty arbeid state', () => {
    let state = defaultKroniskState();
    state.arbeid = undefined;
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.ToggleArbeid,
        payload: { arbeid: ArbeidType.MODERAT }
      },
      i18n
    );
    expect(state2.arbeid).toEqual([ArbeidType.MODERAT]);
  });

  it('ToggleArbeid - should reset the arbeid state', () => {
    const initialState = defaultKroniskState();
    initialState.arbeid = [ArbeidType.MODERAT];
    let state = KroniskReducer(
      initialState,
      {
        type: Actions.ToggleArbeid,
        payload: { arbeid: ArbeidType.MODERAT }
      },
      i18n
    );
    expect(state.arbeid).toEqual([]);
  });

  it('ToggleArbeid - should throw error when arbeid is undefined', () => {
    expect(function () {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.ToggleArbeid
        },
        i18n
      );
    }).toThrow(new Error('Du må spesifisere arbeidstype'));
  });

  it('ToggleArbeid - should throw error when arbeid is undefined in payload', () => {
    expect(function () {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.ToggleArbeid,
          payload: { arbeid: undefined }
        },
        i18n
      );
    }).toThrowError(new Error('Du må spesifisere arbeidstype'));
  });

  it('TogglePaakjenninger - should set the ToggleArbeid', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.TogglePaakjenninger,
        payload: { paakjenning: PaakjenningerType.REGELMESSIG }
      },
      i18n
    );
    expect(state.paakjenninger).toEqual([PaakjenningerType.REGELMESSIG]);
  });

  it('TogglePaakjenninger - should reset the ToggleArbeid', () => {
    const initialState = defaultKroniskState();
    initialState.paakjenninger = [PaakjenningerType.REGELMESSIG];
    let state = KroniskReducer(
      initialState,
      {
        type: Actions.TogglePaakjenninger,
        payload: { paakjenning: PaakjenningerType.REGELMESSIG }
      },
      i18n
    );
    expect(state.paakjenninger).toEqual([]);
  });

  it('TogglePaakjenninger - should set the ToggleArbeid to undefined', () => {
    expect(function () {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.TogglePaakjenninger
        },
        i18n
      );
    }).toThrow(new Error('Du må spesifisere paakjenning'));
  });

  it('TogglePaakjenninger - should set the ToggleArbeid to undefined med undefined i payload', () => {
    expect(function () {
      KroniskReducer(
        defaultKroniskState(),
        {
          type: Actions.TogglePaakjenninger,
          payload: { paakjenning: undefined }
        },
        i18n
      );
    }).toThrowError(new Error('Du må spesifisere paakjenning'));
  });

  it('TogglePaakjenninger - should handle empty state', () => {
    let state = defaultKroniskState();
    state.paakjenninger = undefined;
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.TogglePaakjenninger,
        payload: { paakjenning: PaakjenningerType.REGELMESSIG }
      },
      i18n
    );
    expect(state2.paakjenninger).toEqual([PaakjenningerType.REGELMESSIG]);
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
    expect(state.bekreft).toEqual(true);
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
    expect(state.bekreft).toEqual(false);
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
    expect(state.progress).toEqual(false);
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
    expect(state.progress).toEqual(true);
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
    expect(fravaer?.length).toEqual(1);
    let Aarsfravaer = fravaer!![0];
    expect(Aarsfravaer.year).toEqual(2018);
    expect(Aarsfravaer.okt).toEqual(2);
    let state2 = KroniskReducer(
      state,
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '3' } }
      },
      i18n
    );
    expect(state2.fravaer![0].okt).toEqual(3);
    let state3 = KroniskReducer(
      state,
      {
        type: Actions.Fravaer,
        payload: { fravaer: { year: 2018, month: 9, dager: '' } }
      },
      i18n
    );
    expect(state3.fravaer?.length).toEqual(0);
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
    expect(state2.fravaer?.length).toEqual(0);
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

  it('should set kommentar', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Kommentar,
        payload: { kommentar: 'Nada' }
      },
      i18n
    );
    expect(state.kommentar).toEqual('Nada');
  });

  it('should set kommentar to undefined', () => {
    let state = KroniskReducer(
      defaultKroniskState(),
      {
        type: Actions.Kommentar,
        payload: { kommentar: '' }
      },
      i18n
    );
    expect(state.kommentar).toEqual('');
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
    expect(state.dokumentasjon).toEqual('Joda');
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
    expect(state.dokumentasjon).toEqual('');
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
    expect(state.progress).toEqual(true);
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
    expect(state.kvittering).toEqual(true);
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
    expect(state.submitting).toEqual(false);
    expect(state.progress).toEqual(false);
    expect(state.validated).toEqual(false);
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
        skjemaelementId: 'fnr'
      },
      {
        feilmelding: 'Virksomhetsnummer må fylles ut',
        skjemaelementId: 'orgnr'
      },
      {
        feilmelding: 'Arbeid om den ansatte må fylles ut',
        skjemaelementId: 'arbeidsutfører'
      },
      {
        feilmelding: 'Påkjenninger om den ansatte må fylles ut',
        skjemaelementId: 'paakjenninger'
      },
      {
        feilmelding: 'Mangler antall fraværsperioder',
        skjemaelementId: 'soknad-perioder'
      },
      {
        feilmelding: 'Bekreft at opplysningene er korrekte',
        skjemaelementId: 'bekreftFeilmeldingId'
      },
      {
        feilmelding: 'Fravær må fylles ut',
        skjemaelementId: 'fravaer'
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
    expect(state2.feilmeldinger.length).toBe(7);
    expect(state2.feilmeldinger).toEqual(expectedFeilmeldinger);
  });

  it('should reset to defaults', () => {
    let state = KroniskReducer(defaultKroniskState(), { type: Actions.Reset }, i18n);
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
