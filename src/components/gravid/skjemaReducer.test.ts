import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';
import skjemaReducer from './skjemaReducer';

describe('skjemaReducer', () => {
  it('should set the correct error description', () => {
    const newState = skjemaReducer({}, { field: 'ost', value: 'Muggen' });

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should update the correct error description', () => {
    const initialState = { TiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'TiltakBeskrivelse',
      value: 'Muggen'
    });

    expect(newState).toEqual({ TiltakBeskrivelse: 'Muggen' });
  });

  it('should clear error descriptions', () => {
    const initialState = { TiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'clear',
      value: 'Muggen'
    });

    expect(newState).toEqual({});
  });

  it('should add an error description', () => {
    const initialState = { TiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'fnr',
      value: 'Tørr'
    });

    expect(newState).toEqual({
      fnr: 'Tørr',
      TiltakBeskrivelse: 'Frisk og fin'
    });
  });

  it('should delete an error description when empty string', () => {
    const initialState = { TiltakBeskrivelse: 'Frisk og fin', fnr: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: 'TiltakBeskrivelse',
      value: ''
    });

    expect(newState).toEqual({
      fnr: 'Tørr'
    });
  });

  it('should toggle the state on on TiltakVurdertArbeidstid', () => {
    const initialState = { TiltakBeskrivelse: 'Frisk og fin', fnr: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: Tiltak.TILPASSET_ARBEIDSTID,
      value: 'tiltak'
    });

    expect(newState).toEqual({
      TiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    });
  });

  it('should toggle the state off on TiltakVurdertArbeidstid', () => {
    const initialState = {
      TiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    };
    const newState = skjemaReducer(initialState, {
      field: Tiltak.TILPASSET_ARBEIDSTID,
      value: 'tiltak'
    });

    expect(newState).toEqual({
      TiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      Tiltak: []
    });
  });

  it('should remove OmplasseringAarsak when Omplassering does not require a reason', () => {
    const initialState = {
      TiltakBeskrivelse: 'Frisk og fin',
      OmplasseringAarsak: OmplasseringAarsak.MOTSETTER,
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      Omplassering: Omplassering.IKKE_MULIG
    };
    const newState = skjemaReducer(initialState, {
      field: 'Omplassering',
      value: Omplassering.JA
    });

    expect(newState).toEqual({
      TiltakBeskrivelse: 'Frisk og fin',
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      Omplassering: Omplassering.JA
    });
  });

  it('should add Omplassering when Omplassering is set', () => {
    const initialState = {
      TiltakBeskrivelse: 'Frisk og fin',
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    };
    const newState = skjemaReducer(initialState, {
      field: 'Omplassering',
      value: Omplassering.JA
    });

    expect(newState).toEqual({
      TiltakBeskrivelse: 'Frisk og fin',
      Tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      Omplassering: Omplassering.JA
    });
  });
});
