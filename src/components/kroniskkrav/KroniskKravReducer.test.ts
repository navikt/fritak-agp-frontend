import KroniskKravReducer from './KroniskKravReducer';
import { Actions } from './Actions';
import { defaultKroniskKravState } from './KroniskKravState';
import ValidationResponse from '../../state/validation/ValidationResponse';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import { Language } from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from '../../locale/Locales';

describe('KroniskKravReducer', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

  it('should throw error', () => {
    expect(() => {
      KroniskKravReducer(
        defaultKroniskKravState(),
        {
          type: Actions.HandleResponse
        },
        i18n
      );
    }).toThrow();
  });

  it('should set the fnr', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '123' }
      },
      i18n
    );
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '' }
      },
      i18n
    );
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '456' }
      },
      i18n
    );
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: undefined }
      },
      i18n
    );
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '' }
      },
      i18n
    );
    expect(state.orgnr).toEqual('');
  });

  it('should set the fra', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Fra,
        payload: {
          fra: new Date('2020.06.05 12:00:00'),
          itemId
        }
      },
      i18n
    );

    expect(state.perioder && state?.perioder[0]?.fom?.value).toEqual('05.06.2020');
  });

  it('should set the fra when fom is undefined', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Fra,
        payload: { fra: undefined, itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0]?.fom?.value).toBeUndefined();
  });

  it('should clear fra when empty payload', () => {
    expect(() => {
      const state = KroniskKravReducer(
        defaultKroniskKravState(),
        {
          type: Actions.Fra,
          payload: { fra: undefined, itemId: '0' }
        },
        i18n
      );

      expect(state.perioder && state.perioder[0].fom).toBeUndefined();
    });
  });

  it('should set the til', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Til,
        payload: {
          til: new Date('2020.06.05 12:00:00'),
          itemId
        }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].tom?.value).toEqual('05.06.2020');
  });

  it('should clear til when empty payload', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    const state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Til,
        payload: { til: undefined, itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].tom).toBeUndefined();
  });

  it('should set the dager', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Dager,
        payload: { dager: 3, itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].dager).toEqual(3);
  });

  it('should set the beløp', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Beloep,
        payload: { beloep: 233, itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].beloep).toEqual(233);
  });

  it('should set the kvittering', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Kvittering,
        payload: { kvittering: true }
      },
      i18n
    );
    expect(state.kvittering).toBe(true);
  });

  it('should set the progress', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      i18n
    );
    expect(state.progress).toBe(true);
  });

  it('should set the bekreft to undefined', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: undefined }
      },
      i18n
    );
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: true }
      },
      i18n
    );
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: false }
      },
      i18n
    );
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Progress,
        payload: { progress: false }
      },
      i18n
    );
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      i18n
    );
    expect(state.progress).toEqual(true);
  });

  it('should validate', () => {
    let state = defaultKroniskKravState();
    state = KroniskKravReducer(
      state,
      {
        type: Actions.Validate
      },
      i18n
    );
    expect(state.validated).toBe(true);
  });

  it('should handle response', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.HandleResponse,
        payload: { response: {} as ValidationResponse }
      },
      i18n
    );
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });

  it('should set Grunnbeloep to 345 when grunnbeloep is 14950', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;
    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 14950, itemId }
      },
      i18n
    );
    expect(state.gDagsbeloep).toEqual(345);
  });

  it('should set Grunnbeloep to undefined when 0 is given as param', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;
    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 0, itemId }
      },
      i18n
    );
    expect(state.gDagsbeloep).toEqual(undefined);
  });

  it('should set antallDager to 345 when grunnbeloep is 14950 and action is antallDager', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.antallDager,
        payload: { antallDager: 14950 }
      },
      i18n
    );
    expect(state.antallDager).toEqual(14950);
  });

  it('should set antallDager to 0 when 0 is given as param and action is antallDager', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.antallDager,
        payload: { antallDager: 0 }
      },
      i18n
    );
    expect(state.antallDager).toEqual(0);
  });

  it('should reset to defaults', () => {
    const defaultState = defaultKroniskKravState();
    let state = KroniskKravReducer(defaultState, { type: Actions.Reset }, i18n);
    expect(state.perioder).not.toBeUndefined();
    expect(defaultState.perioder).not.toBeUndefined();

    expect(state.perioder ? state.perioder[0].uniqueKey : undefined).not.toBeUndefined();
    expect(defaultState.perioder ? defaultState.perioder[0].uniqueKey : undefined).not.toBeUndefined();
    // @ts-ignore
    if (state.perioder) delete state.perioder[0].uniqueKey;
    // @ts-ignore
    if (defaultState.perioder) delete defaultState.perioder[0].uniqueKey;
    expect(state).toEqual(defaultState);
    expect(state.fnr).toEqual('');
    expect(state.orgnr).toBeUndefined();
    expect(state.progress).toBeUndefined();
    expect(state.validated).toBeUndefined();
    expect(state.kvittering).toBeUndefined();
    expect(state.bekreft).toEqual(false);
    expect(state.fnrError).toBeUndefined();
    expect(state.orgnrError).toBeUndefined();
    expect(state.bekreftError).toBeUndefined();
    expect(state.feilmeldinger?.length).toEqual(0);
  });

  it('should throw un undefined action', () => {
    expect(() => {
      KroniskKravReducer(
        defaultKroniskKravState(),
        {
          // @ts-ignore ts2339
          type: Actions.ThisIsNotAnAction
        },
        i18n
      );
    }).toThrow();
  });
});
