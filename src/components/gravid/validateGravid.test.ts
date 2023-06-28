import { validateGravid } from './validateGravid';
import { defaultGravidState } from './GravidState';
import { Tiltak } from './Tiltak';
import { MAX_TILTAK_BESKRIVELSE } from './GravidSide';
import { Omplassering } from './Omplassering';
import { Aarsak } from './Aarsak';
import { i18n } from 'i18next';
import { parseDato } from '../../utils/dato/Dato';

const translationMock = {
  t: (param: any) => param
};

describe('validateGravid', () => {
  it('should show fnr error when invalid', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.fnr = '123';
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.fnrError).not.toBeUndefined();
  });

  it('should show termindato error when invalid', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.termindato = parseDato('14.14.2014');
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.termindatoError).not.toBeUndefined();
  });

  it('should show orgnr error when invalid', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.orgnr = '123';
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.orgnrError).not.toBeUndefined();
  });

  it('should not show errors until validation flagged', () => {
    const state = defaultGravidState();
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.feilmeldinger?.length).toEqual(0);
    expect(state2.fnrError).toBeUndefined();
    expect(state2.termindatoError).toBeUndefined();
    expect(state2.orgnrError).toBeUndefined();
    expect(state2.tiltakError).toBeUndefined();
    expect(state2.omplasseringError).toBeUndefined();
    expect(state2.omplasseringAarsakError).toBeUndefined();
    expect(state2.bekreftError).toBeUndefined();
  });

  it('should show warning when not tilrettelegge', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.videre).toBeUndefined();
    expect(state2.feilmeldinger.length).toEqual(0);
  });

  it('should show all arrors when tilrettelegge', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.fnrError).not.toBeUndefined();
    expect(state2.termindatoError).not.toBeUndefined();
    expect(state2.orgnrError).not.toBeUndefined();
    expect(state2.tiltakError).not.toBeUndefined();
    expect(state2.omplasseringError).not.toBeUndefined();
    expect(state2.bekreftError).not.toBeUndefined();
    expect(state2.feilmeldinger.length).toEqual(6);
  });

  it('should error when tiltak is ANNET and empty beskrivelse', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.ANNET];
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.tiltakError).toEqual('GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL');
  });

  it('should error when tiltak is not ANNET and not empty beskrivelse', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.HJEMMEKONTOR];
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.tiltakError).toBeUndefined();
  });

  it('should error when omplassering = umulig and aarsak empty', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.omplassering = Omplassering.IKKE_MULIG;
    state.omplasseringAarsak = undefined;
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.omplasseringError).toBe('GRAVID_VALIDERING_MANGLER_OMPLASSERING_ARSAK');
  });

  it('should not show error when omplassering = umulig and aarsak empty', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.omplassering = Omplassering.IKKE_MULIG;
    state.omplasseringAarsak = Aarsak.HELSETILSTANDEN;
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.omplasseringError).toBeUndefined();
  });

  const lagTekst = (antall: number): string => {
    return '0'.repeat(antall - 1);
  };

  it('should error when tiltakBeskrivelse is too long', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.ANNET];
    state.tiltakBeskrivelse = lagTekst(MAX_TILTAK_BESKRIVELSE + 10);
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.tiltakError).toBeUndefined();
    expect(state2.tiltakBeskrivelseError).toBe('GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE_GRENSE');
  });

  it('should not error when tiltakBeskrivelse within max', () => {
    const state = defaultGravidState();
    state.validated = true;
    state.tilrettelegge = true;
    state.tiltak = [Tiltak.ANNET];
    state.tiltakBeskrivelse = lagTekst(MAX_TILTAK_BESKRIVELSE);
    const state2 = validateGravid(state, translationMock as unknown as i18n);
    expect(state2.tiltakError).toBeUndefined();
    expect(state2.tiltakBeskrivelseError).toBeUndefined();
  });
});
