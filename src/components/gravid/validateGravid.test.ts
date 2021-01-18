import { validateGravid } from './validateGravid';
import { defaultGravidState } from './GravidState';
import { Tiltak } from './Tiltak';

describe('validateGravid', () => {
  it('should show fnr error when invalid', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateGravid(state);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show orgnr error when invalid', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateGravid(state);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidState();
    const state2 = validateGravid(state);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.tiltakError).toBeUndefined();
    expect(state2.omplasseringError).toBeUndefined();
    expect(state2.omplasseringAarsakError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });

  it('should show warning when not tilrettelegge', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    const state2 = validateGravid(state);
    expect(state2.videre).toBeUndefined();
    expect(state2.feilmeldinger.length).toEqual(0);
  });

  it('should show all arrors when tilrettelegge', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    const state2 = validateGravid(state);
    expect(state2.fnrError).not.toBeUndefined();
    expect(state2.orgnrError).not.toBeUndefined();
    expect(state2.tiltakError).not.toBeUndefined();
    expect(state2.omplasseringError).not.toBeUndefined();
    expect(state2.bekreftError).not.toBeUndefined();
    expect(state2.feilmeldinger.length).toEqual(5);
  });

  it('should error when tiltak is ANNET and empty beskrivelse', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.ANNET];
    const state2 = validateGravid(state);
    expect(state2.tiltakError).toEqual('Beskriv hva dere har gjort');
  });

  it('should error when tiltak is not ANNET and not empty beskrivelse', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.HJEMMEKONTOR];
    const state2 = validateGravid(state);
    expect(state2.tiltakError).toBeUndefined();
  });
});
