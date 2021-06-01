import { validateGravidKrav } from './validateGravidKrav';
import { defaultGravidKravState } from './GravidKravState';
import { parseDato } from '../../utils/dato/Dato';
import { i18n } from 'i18next';

const translationMock = {
  t: (param: any) => param
};

describe('validateGravidKrav', () => {
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
    state.fra = parseDato('14.14.2014');
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    state.til = parseDato('14.14.2014');
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.til?.error).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidKravState();
    const state2 = validateGravidKrav(state, translationMock as unknown as i18n);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.fraError).toBeUndefined();
    expect(state2.tilError).toBeUndefined();
    expect(state2.dagerError).toBeUndefined();
    expect(state2.beloepError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
