import { parseISO } from 'date-fns';
import { validateKroniskKrav } from './validateKroniskKrav';
import { defaultKroniskKravState } from './KroniskKravState';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import { Language } from '../../locale/Language';
import { MAX_DAGER_MELLOM_PERIODER } from '../../config/konstanter';

describe('validateKroniskKrav', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

  it.each([
    { start: '2025-01-22', error: undefined },
    { start: '2025-01-23', error: `Det kan ikke være mer enn ${MAX_DAGER_MELLOM_PERIODER} dager mellom periodene` },
    { start: '2025-01-05', error: 'Periodene kan ikke overlappe' }
  ])('validates the relationship between periods starting $start', ({ start, error }) => {
    const state = defaultKroniskKravState({
      validated: true,
      feilmeldinger: [],
      perioder: [
        { uniqueKey: 'first', fom: parseISO('2025-01-01'), tom: parseISO('2025-01-05'), dager: 5 },
        { uniqueKey: 'second', fom: parseISO(start), tom: parseISO(start), dager: 1 }
      ]
    });
    const original = structuredClone(state);

    const result = validateKroniskKrav(state, i18n);

    expect(result.perioder?.[1].fomError || undefined).toBe(error);
    expect(result.periodeError).toBeUndefined();
    expect(result.feilmeldinger.filter((feil) => feil.skjemaelementId === '#fra-dato-1')).toHaveLength(error ? 1 : 0);
    expect(state).toEqual(original);
  });

  it.each(['correct', 'delete'])('clears period errors after %s', (action) => {
    let state = defaultKroniskKravState({
      validated: true,
      feilmeldinger: [],
      perioder: [
        { uniqueKey: 'first', fom: parseISO('2025-01-01'), tom: parseISO('2025-01-05'), dager: 5 },
        { uniqueKey: 'second', fom: parseISO('2025-01-23'), tom: parseISO('2025-01-23'), dager: 1 }
      ]
    });
    state = validateKroniskKrav(state, i18n);
    expect(state.perioder?.[1].fomError).toContain(`${MAX_DAGER_MELLOM_PERIODER}`);
    state.perioder =
      action === 'delete'
        ? state.perioder?.slice(0, 1)
        : state.perioder?.map((periode, index) =>
            index === 1 ? { ...periode, fom: parseISO('2025-01-22'), tom: parseISO('2025-01-22') } : periode
          );

    const result = validateKroniskKrav(state, i18n);

    expect(result.perioder?.every((periode) => !periode.fomError)).toBe(true);
    expect(result.feilmeldinger.some((feil) => feil.skjemaelementId === '#fra-dato-1')).toBe(false);
  });

  it('does not mutate the periods being validated', () => {
    const state = defaultKroniskKravState({ validated: true, feilmeldinger: [] });
    const original = structuredClone(state);

    const result = validateKroniskKrav(state, i18n);

    expect(state).toEqual(original);
    expect(result.perioder).not.toBe(state.perioder);
    expect(result.feilmeldinger.length).toBeGreaterThan(0);
  });

  it('should show fnr error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show orgnr error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should show fra error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.fnr = '123';
    state.perioder = [{ uniqueKey: 'unik', fom: parseISO('2014-14-14') }];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.fnr = '123';
    state.perioder = [{ uniqueKey: 'unik', tom: parseISO('2014-14-14') }];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].tomError : undefined).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultKroniskKravState();
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].fomError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].tomError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].dagerError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].beloepError : 'defined').toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
