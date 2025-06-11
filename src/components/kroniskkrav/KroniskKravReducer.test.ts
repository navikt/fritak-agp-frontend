import KroniskKravReducer from './KroniskKravReducer';
import { Actions } from './Actions';
import { defaultKroniskKravState } from './KroniskKravState';
import { ValidationResponse } from '../../state/validation/ValidationResponse';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import { Language } from '../../locale/Language';

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
    expect(state.formDirty).toBeTruthy();
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

  it('should set the orgnr and set for dirty at second run', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.Orgnr,
        payload: { orgnr: '456' }
      },
      i18n
    );
    expect(state.orgnr).toEqual('456');
    expect(state.formDirty).toBe(false);

    let newState = KroniskKravReducer(
      state,
      {
        type: Actions.Orgnr,
        payload: { orgnr: '567' }
      },
      i18n
    );
    expect(newState.orgnr).toEqual('567');
    expect(newState.formDirty).toBe(true);
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
    expect(state.formDirty).toBe(true);
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
    expect(state.formDirty).toBe(true);
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
    expect(state.formDirty).toBe(true);
  });

  it('should set the beløp', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Beloep,
        payload: { belop: 233, itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].belop).toEqual(233);
    expect(state.formDirty).toBe(true);
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
    expect(state.formDirty).toBe(false);
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
        payload: { response: {} as ValidationResponse<KroniskKravResponse> }
      },
      i18n
    );
    expect(state.submitting).toBe(false);
    expect(state.progress).toBe(false);
    expect(state.validated).toBe(false);
  });

  it('should set Grunnbeloep to 14950 when grunnbeloep is 14950', () => {
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
    expect(state.perioder && state.perioder[0]?.grunnbeloep).toEqual(14950);
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
    expect(state.perioder && state.perioder[0]?.grunnbeloep).toEqual(undefined);
  });

  it('should return the default state when function tries to set grunnbeloep on an invalid row', () => {
    const defaultState = defaultKroniskKravState();
    const itemId = 'banan';

    let state = KroniskKravReducer(
      defaultState,
      {
        type: Actions.Grunnbeloep,
        payload: { grunnbeloep: 0, itemId }
      },
      i18n
    );

    expect(state).toEqual(defaultState);
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

  it('should set sykemeldingsgrad to 12 when 12 is given as param and action is Sykemeldingsgrad', () => {
    const defaultKrav = defaultKroniskKravState();
    // @ts-ignore
    const itemId = defaultKrav.perioder[0].uniqueKey;

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.Sykemeldingsgrad,
        payload: { sykemeldingsgrad: '12', itemId }
      },
      i18n
    );
    expect(state.perioder && state.perioder[0].sykemeldingsgrad).toEqual('12');
  });

  it('should throw on undefined itemId for Sykemeldingsgrad', () => {
    expect(() => {
      KroniskKravReducer(
        defaultKroniskKravState(),
        {
          // @ts-ignore ts2339
          type: Actions.Sykemeldingsgrad
        },
        i18n
      );
    }).toThrow();
  });

  it('should set notAuthorized to false when action is NotAuthorized', () => {
    const defaultKrav = defaultKroniskKravState();

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.NotAuthorized
      },
      i18n
    );
    expect(state.notAuthorized).toBe(false);
  });

  it('should add periode when the action is AddPeriod', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.perioder?.length).toBe(1);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddPeriod
      },
      i18n
    );
    expect(state.perioder?.length).toBe(2);
  });

  it('should delete periode when the action is DeletePeriode', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.perioder?.length).toBe(1);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddPeriod
      },
      i18n
    );
    expect(state.perioder?.length).toBe(2);

    // @ts-ignore
    const itemId = state.perioder[1].uniqueKey;

    let state2 = KroniskKravReducer(
      state,
      {
        type: Actions.DeletePeriode,
        payload: {
          itemId: itemId
        }
      },
      i18n
    );

    expect(state2.perioder?.length).toBe(1);
  });

  it('should delete periode when the action is KravEndring', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.perioder?.length).toBe(1);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.KravEndring,
        payload: {
          krav: {
            id: 'test',
            identitetsnummer: '12345678901',
            virksomhetsnummer: '123456789',
            antallDager: 1,
            perioder: [
              {
                fom: '2022-11-12',
                tom: '2022-12-13',
                antallDagerMedRefusjon: 5,
                månedsinntekt: 123,
                gradering: 1,
                dagsats: 123,
                belop: 123
              }
            ],
            opprettet: '2022-12-24',
            sendtAv: 'sender',
            sendtAvNavn: 'sNavn',
            navn: 'Navn',
            kontrollDager: 260,
            journalpostId: 'id',
            oppgaveId: 'oId',
            virksomhetsnavn: 'vnavn',
            status: 'status'
          }
        }
      },
      i18n
    );

    if (!state) {
      state = { feilmeldinger: [] };
    }
    const fom = state.perioder![0].fom;
    const tom = state.perioder![0].tom;

    expect(fom?.value).toBe('12.11.2022');
    expect(tom?.value).toBe('13.12.2022');
  });

  it('should show and hide spinner', () => {
    let state = KroniskKravReducer(
      defaultKroniskKravState(),
      {
        type: Actions.ShowSpinner
      },
      i18n
    );
    expect(state.showSpinner).toBe(true);

    let newState = KroniskKravReducer(
      state,
      {
        type: Actions.HideSpinner
      },
      i18n
    );
    expect(newState.showSpinner).toBe(false);
  });

  it('should add an backend errormessage when the action is AddBackendError, no duplication', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.feilmeldinger?.length).toBe(0);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding'
        }
      },
      i18n
    );
    expect(state.feilmeldinger[0].feilmelding).toBe('Feilmelding');

    let newState = KroniskKravReducer(
      state,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding'
        }
      },
      i18n
    );
    expect(newState.feilmeldinger[0].feilmelding).toBe('Feilmelding');
  });

  it('should remove all backend errormessages when the action is RemoveBackendError', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.feilmeldinger?.length).toBe(0);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding'
        }
      },
      i18n
    );
    expect(state.feilmeldinger[0].feilmelding).toBe('Feilmelding');
    expect(state.feilmeldinger?.length).toBe(1);

    let state2 = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding2'
        }
      },
      i18n
    );
    expect(state2.feilmeldinger[1].feilmelding).toBe('Feilmelding2');
    expect(state2.feilmeldinger?.length).toBe(2);

    let state3 = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.RemoveBackendError
      },
      i18n
    );

    expect(state3.feilmeldinger?.length).toBe(0);
  });

  it('should remove all backend errormessages when the action is RemoveBackendError, no duplication', () => {
    const defaultKrav = defaultKroniskKravState();

    expect(defaultKrav.feilmeldinger?.length).toBe(0);

    let state = KroniskKravReducer(
      defaultKrav,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding'
        }
      },
      i18n
    );
    expect(state.feilmeldinger[0].feilmelding).toBe('Feilmelding');
    expect(state.feilmeldinger.length).toBe(1);

    state = KroniskKravReducer(
      state,
      {
        type: Actions.AddBackendError,
        payload: {
          error: 'Feilmelding 2'
        }
      },
      i18n
    );
    expect(state.feilmeldinger.length).toBe(2);

    state = KroniskKravReducer(
      state,
      {
        type: Actions.RemoveBackendError
      },
      i18n
    );
    expect(state.feilmeldinger.length).toBe(0);
  });
});
