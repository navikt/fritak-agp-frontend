import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';
import skjemaReducer from './skjemaReducer';

describe('skjemaReducer', () => {
  it('should set the correct error description', () => {
    const newState = skjemaReducer({}, { field: 'ost', value: 'Muggen' });

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should update the correct error description', () => {
    const initialState = { tiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'tiltakBeskrivelse',
      value: 'Muggen'
    });

    expect(newState).toEqual({ tiltakBeskrivelse: 'Muggen' });
  });

  it('should clear error descriptions', () => {
    const initialState = { tiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'clear',
      value: 'Muggen'
    });

    expect(newState).toEqual({});
  });

  it('should add an error description', () => {
    const initialState = { tiltakBeskrivelse: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'fnr',
      value: 'Tørr'
    });

    expect(newState).toEqual({
      fnr: 'Tørr',
      tiltakBeskrivelse: 'Frisk og fin'
    });
  });

  it('should delete an error description when empty string', () => {
    const initialState = { tiltakBeskrivelse: 'Frisk og fin', fnr: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: 'tiltakBeskrivelse',
      value: ''
    });

    expect(newState).toEqual({
      fnr: 'Tørr'
    });
  });

  it('should toggle the state on on TiltakVurdertArbeidstid', () => {
    const initialState = { tiltakBeskrivelse: 'Frisk og fin', fnr: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: Tiltak.TILPASSET_ARBEIDSTID,
      value: 'tiltak'
    });

    expect(newState).toEqual({
      tiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    });
  });

  it('should toggle the state off on TiltakVurdertArbeidstid', () => {
    const initialState = {
      tiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    };
    const newState = skjemaReducer(initialState, {
      field: Tiltak.TILPASSET_ARBEIDSTID,
      value: 'tiltak'
    });

    expect(newState).toEqual({
      tiltakBeskrivelse: 'Frisk og fin',
      fnr: 'Tørr',
      tiltak: []
    });
  });

  it('should remove OmplasseringAarsak when Omplassering does not require a reason', () => {
    const initialState = {
      tiltakBeskrivelse: 'Frisk og fin',
      omplasseringAarsak: OmplasseringAarsak.MOTSETTER,
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      omplassering: Omplassering.IKKE_MULIG
    };
    const newState = skjemaReducer(initialState, {
      field: 'omplassering',
      value: Omplassering.JA
    });

    expect(newState).toEqual({
      tiltakBeskrivelse: 'Frisk og fin',
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      omplassering: Omplassering.JA
    });
  });

  it('should add Omplassering when Omplassering is set', () => {
    const initialState = {
      tiltakBeskrivelse: 'Frisk og fin',
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID]
    };
    const newState = skjemaReducer(initialState, {
      field: 'omplassering',
      value: Omplassering.JA
    });

    expect(newState).toEqual({
      tiltakBeskrivelse: 'Frisk og fin',
      tiltak: [Tiltak.TILPASSET_ARBEIDSTID],
      omplassering: Omplassering.JA
    });
  });
});
