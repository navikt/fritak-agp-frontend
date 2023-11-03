import { validateKronisk } from './validateKronisk';
import { defaultKroniskState } from './KroniskState';
import Aarsfravaer from './Aarsfravaer';
import testFnr from '../../mockData/testFnr';
import testOrgnr from '../../mockData/testOrgnr';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import Language from '../../locale/Language';

describe('validateKronisk', () => {
  const i18n = languageInit(i18next, Language.nb, Locales);

  it('should not show error messages before validated', () => {
    const state = defaultKroniskState();
    state.validated = undefined;
    const state2 = validateKronisk(state, i18n);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.fravaerError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });

  it('should show error messages when validated and empty values', () => {
    const state = defaultKroniskState();
    state.validated = true;
    const state2 = validateKronisk(state, i18n);
    console.log(state2);
    expect(state2.fnrError).not.toBeUndefined();
    expect(state2.orgnrError).not.toBeUndefined();
    expect(state2.fravaerError).not.toBeUndefined();
    expect(state2.bekreftError).not.toBeUndefined();
  });

  it('should not show error messages when validated and valid values', () => {
    const state = defaultKroniskState();
    state.fnr = testFnr.GyldigeFraDolly.TestPerson1;
    state.orgnr = testOrgnr.GyldigeOrgnr.TestOrg1;
    state.fravaer = [
      {
        year: 2020,
        jan: 1,
        mar: 3,
        des: 12
      } as Aarsfravaer
    ];
    state.bekreft = true;
    state.validated = true;
    const state2 = validateKronisk(state, i18n);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.fravaerError).toBeUndefined();
    expect(state2.bekreftError).toBe('');
  });

  it('should show error when invalid fnr', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateKronisk(state, i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show error when invalid orgnr', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateKronisk(state, i18n);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should not show error when valid fravær', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.fravaer = [
      {
        year: 2020,
        jan: 2
      } as Aarsfravaer
    ];
    const state2 = validateKronisk(state, i18n);
    expect(state2.fravaerError).toBeUndefined();
  });
});
