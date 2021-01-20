import { validateKronisk } from './validateKronisk';
import { defaultKroniskState } from './KroniskState';
import PaakjenningerType from './PaakjenningerType';
import Aarsfravaer from './Aarsfravaer';
import ArbeidType from './ArbeidType';
import { MAX_BESKRIVELSE } from './KroniskSide';

describe('validateKronisk', () => {
  it('should not show error messages before validated', () => {
    const state = defaultKroniskState();
    state.validated = undefined;
    const state2 = validateKronisk(state);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.arbeidError).toBeUndefined();
    expect(state2.paakjenningerError).toBeUndefined();
    expect(state2.fravaerError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });

  it('should show error messages when validated and empty values', () => {
    const state = defaultKroniskState();
    state.validated = true;
    const state2 = validateKronisk(state);
    expect(state2.fnrError).not.toBeUndefined();
    expect(state2.orgnrError).not.toBeUndefined();
    expect(state2.arbeidError).not.toBeUndefined();
    expect(state2.paakjenningerError).not.toBeUndefined();
    expect(state2.fravaerError).not.toBeUndefined();
    expect(state2.bekreftError).not.toBeUndefined();
  });

  it('should not show error messages when validated and valid values', () => {
    const state = defaultKroniskState();
    state.validated = true;
    const state2 = validateKronisk(state);
    expect(state2.fnrError).not.toBeUndefined();
    expect(state2.orgnrError).not.toBeUndefined();
    expect(state2.arbeidError).not.toBeUndefined();
    expect(state2.paakjenningerError).not.toBeUndefined();
    expect(state2.fravaerError).not.toBeUndefined();
    expect(state2.bekreftError).not.toBeUndefined();
  });

  it('should show error when invalid fnr', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateKronisk(state);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show error when invalid orgnr', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateKronisk(state);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should show error when empty arbeid', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.arbeid = [];
    const state2 = validateKronisk(state);
    expect(state2.arbeidError).not.toBeUndefined();
  });

  it('should not show error when arbeid', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.arbeid = [ArbeidType.KREVENDE];
    const state2 = validateKronisk(state);
    expect(state2.arbeidError).toEqual('');
  });

  it('should show error when empty påkjenninger', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.paakjenninger = [];
    const state2 = validateKronisk(state);
    expect(state2.paakjenningerError).not.toBeUndefined();
  });

  it('should not show error when påkjenninger', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.paakjenninger = [PaakjenningerType.ALLERGENER];
    const state2 = validateKronisk(state);
    expect(state2.paakjenningerError).toEqual('');
  });

  it('should show error when påkjenninger ANNET and empty kommentar', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.paakjenninger = [PaakjenningerType.ANNET];
    const state2 = validateKronisk(state);
    expect(state2.kommentarError).not.toBeUndefined();
  });

  const lagTekst = (antall: number): string => {
    let dummy = '';
    for (let x = 0; x < antall; x++) {
      dummy += 'a';
    }
    return dummy;
  };

  it('should show error when påkjenninger ANNET and too long kommentar', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.paakjenninger = [PaakjenningerType.ANNET];
    state.kommentar = lagTekst(MAX_BESKRIVELSE + 1);
    const state2 = validateKronisk(state);
    expect(state2.kommentarError).not.toBeUndefined();
  });

  it('should show error when påkjenninger ANNET and within max kommentar', () => {
    const state = defaultKroniskState();
    state.validated = true;
    state.paakjenninger = [PaakjenningerType.ANNET];
    state.kommentar = lagTekst(MAX_BESKRIVELSE);
    const state2 = validateKronisk(state);
    expect(state2.kommentarError).toBeUndefined();
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
    const state2 = validateKronisk(state);
    expect(state2.fravaerError).toBeUndefined();
  });
});
