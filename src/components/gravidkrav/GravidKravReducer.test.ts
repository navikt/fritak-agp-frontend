import GravidKravReducer from './GravidKravReducer';
import { Actions } from './Actions';
import { defaultGravidKravState } from './GravidKravState';
import { i18n } from 'i18next';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const translationMock = {
  t: (param: any) => param
};

describe('GravidKravReducer', () => {
  it('should throw error', () => {
    expect(() => {
      GravidKravReducer(
        defaultGravidKravState(),
        {
          type: Actions.HandleResponse
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should set the fnr', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '123' }
      },
      translationMock as unknown as i18n
    );
    expect(state.fnr).toEqual('123');
  });

  it('should set the fnr to empty', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Fnr,
        payload: { fnr: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.fnr).toEqual('');
  });

  it('should set the orgnr', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '456' }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toEqual('456');
  });

  it('should set the orgnr to undefined', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: undefined }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toBeUndefined();
  });

  it('should set the orgnr to empty string', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.orgnr).toEqual('');
  });

  it('should set the fom', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Fra,
        payload: { fra: new Date('2020.06.05 12:00:00'), itemId }
      },
      translationMock as unknown as i18n
    );

    // @ts-ignore
    expect(state.perioder[0].fom.value).toEqual('05.06.2020');
  });

  it('should throw on fom when itemId is missing', () => {
    expect(() => {
      GravidKravReducer(
        defaultGravidKravState(),
        {
          type: Actions.Fra,
          payload: { fra: undefined }
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should clear fom when empty payload', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Fra,
        payload: { fra: undefined, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].fom?.value).toBeUndefined();
  });

  it('should set the tom', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Til,
        payload: { til: new Date('2020.06.05 12:00:00'), itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].tom?.value).toEqual('05.06.2020');
  });

  it('should clear tom when empty payload', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Til,
        payload: { til: undefined, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].tom).toBeUndefined();
  });

  it('should throw on tom when itemId is missing', () => {
    expect(() => {
      GravidKravReducer(
        defaultGravidKravState(),
        {
          type: Actions.Til,
          payload: { til: undefined }
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should set the dager', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Dager,
        payload: { dager: 3, itemId }
      },
      translationMock as unknown as i18n
    );
    // @ts-ignore
    expect(state.perioder[0].dager).toEqual(3);
  });

  it('should throw on dager when itemId is missing', () => {
    expect(() => {
      GravidKravReducer(
        defaultGravidKravState(),
        {
          // @ts-ignore ts2339
          type: Actions.Dager,
          payload: { dager: 3 }
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should set the beløp', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Beloep,
        payload: { belop: 233, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].belop).toEqual(233);
  });

  it('should set the kvittering', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Kvittering,
        payload: { kvittering: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.kvittering).toBe(true);
  });

  it('should set the progress', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toBe(true);
  });

  it('should set the bekreft to undefined', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: undefined }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toBeUndefined();
  });

  it('should set the bekreft to true', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toEqual(true);
  });

  it('should set the bekreft to false', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Bekreft,
        payload: { bekreft: false }
      },
      translationMock as unknown as i18n
    );
    expect(state.bekreft).toEqual(false);
  });

  it('should set the progress to false', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Progress,
        payload: { progress: false }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toEqual(false);
  });

  it('should set the progress to true', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Progress,
        payload: { progress: true }
      },
      translationMock as unknown as i18n
    );
    expect(state.progress).toEqual(true);
  });

  it('should set dokumentasjon', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: 'Joda' }
      },
      translationMock as unknown as i18n
    );
    expect(state.dokumentasjon).toEqual('Joda');
  });

  it('should set dokumentasjon to be empty', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.Dokumentasjon,
        payload: { dokumentasjon: '' }
      },
      translationMock as unknown as i18n
    );
    expect(state.dokumentasjon).toEqual('');
  });

  it('should validate', () => {
    let state = defaultGravidKravState();
    state = GravidKravReducer(
      state,
      {
        type: Actions.Validate
      },
      translationMock as unknown as i18n
    );
    expect(state.validated).toBe(true);
  });

  it('should handle response', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.HandleResponse,
        payload: { response: {} as ValidationResponse }
      },
      translationMock as unknown as i18n
    );
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });

  it('should set correct grunnbeloep to 14950 when grunnbeloep is 14950', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 14950, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].grunnbeloep).toEqual(14950);
  });

  it('should set correct grunnbeloep to undefined when 0 is given as param', () => {
    const defaultState = defaultGravidKravState();
    const itemId = defaultState.perioder ? defaultState.perioder[0].uniqueKey : 'feil';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 0, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder && state.perioder[0].grunnbeloep).toEqual(undefined);
  });

  it('should return the default state when function tries to set grunnbeloep on an invalid row', () => {
    const defaultState = defaultGravidKravState();
    const itemId = 'banan';

    let state = GravidKravReducer(
      defaultState,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 0, itemId }
      },
      translationMock as unknown as i18n
    );

    expect(state).toEqual(defaultState);
  });
  it('should set antallDager to 345 when grunnbeloep is 14950 and action is antallDager', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.antallDager,
        payload: { antallDager: 14950 }
      },
      translationMock as unknown as i18n
    );
    expect(state.antallDager).toEqual(14950);
  });

  it('should set antallDager to 0 when 0 is given as param and action is antallDager', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.antallDager,
        payload: { antallDager: 0 }
      },
      translationMock as unknown as i18n
    );
    expect(state.antallDager).toEqual(0);
  });

  it('should reset to defaults', () => {
    const defaultState = defaultGravidKravState();
    let state = GravidKravReducer(defaultState, { type: Actions.Reset }, translationMock as unknown as i18n);
    const tmpState = Object.assign({}, state);
    // @ts-ignore
    delete state.perioder[0].uniqueKey;
    // @ts-ignore
    delete defaultState.perioder[0].uniqueKey;
    expect(tmpState).toEqual(defaultState);
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
    expect(() => {
      GravidKravReducer(
        defaultGravidKravState(),
        {
          // @ts-ignore ts2339
          type: Actions.ThisIsNotAnAction
        },
        translationMock as unknown as i18n
      );
    }).toThrow();
  });

  it('should add a periode', () => {
    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.AddPeriode,
        payload: {}
      },
      translationMock as unknown as i18n
    );
    expect(state.perioder?.length).toBe(2);
  });

  it('should add a periode and remove a periode', () => {
    const initialState = defaultGravidKravState();
    // @ts-ignore
    const initialPeriodeId = initialState.perioder[0].uniqueKey;

    let state = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.AddPeriode,
        payload: {}
      },
      translationMock as unknown as i18n
    );

    expect(state.perioder?.length).toBe(2);

    let newState = GravidKravReducer(
      defaultGravidKravState(),
      {
        type: Actions.DeletePeriode,
        payload: { itemId: initialPeriodeId }
      },
      translationMock as unknown as i18n
    );

    expect(newState.perioder?.length).toBe(1);
  });
});
