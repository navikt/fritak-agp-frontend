import { validateKroniskKrav } from './validateKroniskKrav';
import { defaultKroniskKravState } from './KroniskKravState';
import { parseDato } from '../../utils/dato/Dato';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import { Language } from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from '../../locale/Locales';

describe('validateKroniskKrav', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

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
    state.perioder = [{ fra: parseDato('14.14.2014') }];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.fnr = '123';
    state.perioder = [{ til: parseDato('14.14.2014') }];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].til?.error : undefined).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultKroniskKravState();
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].fraError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].tilError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].dagerError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].beloepError : 'defined').toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
