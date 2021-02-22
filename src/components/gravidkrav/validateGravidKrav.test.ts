import { validateGravidKrav } from './validateGravidKrav';
import { defaultGravidKravState } from './GravidKravState';
import { parseDato } from '../../utils/Dato';

describe('validateGravidKrav', () => {
  it('should show fnr error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateGravidKrav(state);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show fra error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    state.fra = parseDato('14.14.2014');
    const state2 = validateGravidKrav(state);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show til error when invalid', () => {
    const state = defaultGravidKravState();
    state.validated = true;
    state.fnr = '123';
    state.til = parseDato('14.14.2014');
    const state2 = validateGravidKrav(state);
    expect(state2.til.error).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidKravState();
    const state2 = validateGravidKrav(state);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.fraError).toBeUndefined();
    expect(state2.tilError).toBeUndefined();
    expect(state2.dagerError).toBeUndefined();
    expect(state2.beloepError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });
});
