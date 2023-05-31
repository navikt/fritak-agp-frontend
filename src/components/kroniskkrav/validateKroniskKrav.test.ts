import { validateKroniskKrav } from './validateKroniskKrav';
import { defaultKroniskKravState } from './KroniskKravState';
import { parseDato } from '../../utils/dato/Dato';
import { languageInit } from '../../locale/languageInit';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import Language from '../../locale/Language';

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
    state.perioder = [{ uniqueKey: 'unik', perioder: [{ uniqueKey: 'unik2', fom: parseDato('14.14.2014') }] }];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultKroniskKravState();
    state.validated = true;
    state.fnr = '123';
    state.perioder = [
      {
        uniqueKey: 'unik',
        perioder: [
          {
            tom: parseDato('14.14.2014'),
            uniqueKey: 'unik2'
          }
        ]
      }
    ];
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].perioder[0].tomError : undefined).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultKroniskKravState();
    const state2 = validateKroniskKrav(state, i18n);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.perioder).not.toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].perioder[0].fomError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].perioder[0].tomError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].dagerError : 'defined').toBeUndefined();
    expect(state2.perioder ? state2.perioder[0].belopError : 'defined').toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
