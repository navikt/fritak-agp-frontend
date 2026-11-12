import { parseISO } from 'date-fns';
import { validateGravidKrav } from './validateGravidKrav';
import { defaultGravidKravState } from './GravidKravState';
import { i18n } from 'i18next';
import { ValidateDagerKeys } from '../../validation/validateDager';
import { ValidatePerioderKeys } from '../../validation/validatePerioder';

const translationMock = {
  t: (param: never) => param
};

describe('validateGravidKrav', () => {
  it.each([
    { start: '2025-01-22', error: undefined },
    { start: '2025-01-23', error: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD },
    { start: '2025-01-05', error: ValidatePerioderKeys.VALIDATE_PERIODER_OVERLAPP }
  ])('validates the relationship between periods starting $start', ({ start, error }) => {
    const state = defaultGravidKravState({
      validated: true,
      feilmeldinger: [],
      perioder: [
        { uniqueKey: 'first', fom: parseISO('2025-01-01'), tom: parseISO('2025-01-05'), dager: 5 },
        { uniqueKey: 'second', fom: parseISO(start), tom: parseISO(start), dager: 1 }
      ]
    });
    const original = structuredClone(state);

    const result = validateGravidKrav(state, translationMock as unknown as i18n);

    expect(result.perioder?.[1].fomError).toBe(error);
    expect(result.periodeError).toBeUndefined();
    expect(result.feilmeldinger.filter((feil) => feil.skjemaelementId === '#fra-dato-1')).toHaveLength(error ? 1 : 0);
    expect(state).toEqual(original);
  });

  it.each(['correct', 'delete'])('clears period errors after %s', (action) => {
    let state = defaultGravidKravState({
      validated: true,
      feilmeldinger: [],
      perioder: [
        { uniqueKey: 'first', fom: parseISO('2025-01-01'), tom: parseISO('2025-01-05'), dager: 5 },
        { uniqueKey: 'second', fom: parseISO('2025-01-23'), tom: parseISO('2025-01-23'), dager: 1 }
      ]
    });
    state = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state.perioder?.[1].fomError).toBe(ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD);
    state.perioder =
      action === 'delete'
        ? state.perioder?.slice(0, 1)
        : state.perioder?.map((periode, index) =>
            index === 1 ? { ...periode, fom: parseISO('2025-01-22'), tom: parseISO('2025-01-22') } : periode
          );

    const result = validateGravidKrav(state, translationMock as unknown as i18n);

    expect(result.perioder?.every((periode) => !periode.fomError)).toBe(true);
    expect(result.feilmeldinger.some((feil) => feil.skjemaelementId === '#fra-dato-1')).toBe(false);
  });

  it.each([
    { dager: [8, 8], error: undefined },
    { dager: [8, 9], error: ValidateDagerKeys.VALIDATE_DAGER_TOO_HIGH },
    { dager: [0], error: ValidateDagerKeys.VALIDATE_DAGER_MISSING },
    { dager: [], error: ValidateDagerKeys.VALIDATE_DAGER_MISSING }
  ])('validates total days for $dager', ({ dager, error }) => {
    const state = defaultGravidKravState({
      validated: true,
      feilmeldinger: [],
      perioder: dager.map((antallDager, index) => ({ uniqueKey: `periode-${index}`, dager: antallDager }))
    });

    const result = validateGravidKrav(state, translationMock as unknown as i18n);

    expect(result.periodeError).toBe(error);
    expect(result.feilmeldinger.some((feil) => feil.skjemaelementId === '#dager-total')).toBe(!!error);
  });

  it('clears the total days error after correcting the periods', () => {
    const state = defaultGravidKravState({
      validated: true,
      feilmeldinger: [],
      periodeError: ValidateDagerKeys.VALIDATE_DAGER_TOO_HIGH,
      perioder: [{ uniqueKey: 'periode', dager: 16 }]
    });

    const result = validateGravidKrav(state, translationMock as unknown as i18n);

    expect(result.periodeError).toBeUndefined();
    expect(result.feilmeldinger.some((feil) => feil.skjemaelementId === '#dager-total')).toBe(false);
  });

  it('does not mutate the periods being validated', () => {
    const state = defaultGravidKravState({ validated: true, feilmeldinger: [] });
    const original = structuredClone(state);

    const result = validateGravidKrav(state, translationMock as unknown as i18n);

    expect(state).toEqual(original);
    expect(result.perioder).not.toBe(state.perioder);
    expect(result.feilmeldinger.length).toBeGreaterThan(0);
  });

  it('should show fnr error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show orgnr error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should show fra error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    if (state.perioder) state.perioder[0].fom = parseISO('2014-14-14');
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid' }];
    expect(state2.perioder[0].fomError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    if (state.perioder) {
      state.perioder[0].fom = parseISO('2014-12-12');
      state.perioder[0].tom = parseISO('2014-11-11');
    }
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid' }];
    expect(state2.perioder[0].tomError).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidKravState();
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    if (!state2.perioder) state2.perioder = [{ uniqueKey: 'uuid' }];
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.perioder[0].fomError).toBeUndefined();
    expect(state2.perioder[0].tomError).toBeUndefined();
    expect(state2.perioder[0].dagerError).toBeUndefined();
    expect(state2.perioder[0].beloepError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
