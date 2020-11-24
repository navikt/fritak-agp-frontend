import skjemaReducer from './skjemaReducer';

describe('skjemaReducer', () => {
  it('should set the correct error description', () => {
    const newState = skjemaReducer({}, { field: 'ost', value: 'Muggen' });

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should update the correct error description', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'ost',
      value: 'Muggen'
    });

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should clear error descriptions', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'clear',
      value: 'Muggen'
    });

    expect(newState).toEqual({});
  });

  it('should add an error description', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = skjemaReducer(initialState, {
      field: 'loff',
      value: 'Tørr'
    });

    expect(newState).toEqual({
      loff: 'Tørr',
      ost: 'Frisk og fin'
    });
  });

  it('should delete an error description when empty string', () => {
    const initialState = { ost: 'Frisk og fin', loff: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: 'ost',
      value: ''
    });

    expect(newState).toEqual({
      loff: 'Tørr'
    });
  });

  it('should toggle the state on on TiltakVurdertArbeidstid', () => {
    const initialState = { ost: 'Frisk og fin', loff: 'Tørr' };
    const newState = skjemaReducer(initialState, {
      field: 'TiltakVurdertArbeidstid',
      value: 'tiltak'
    });

    expect(newState).toEqual({
      ost: 'Frisk og fin',
      loff: 'Tørr',
      TiltakVurdertArbeidstid: 'tiltak'
    });
  });

  it('should toggle the state off on TiltakVurdertArbeidstid', () => {
    const initialState = {
      ost: 'Frisk og fin',
      loff: 'Tørr',
      TiltakVurdertArbeidstid: 'tiltak'
    };
    const newState = skjemaReducer(initialState, {
      field: 'TiltakVurdertArbeidstid',
      value: 'tiltak'
    });

    expect(newState).toEqual({
      ost: 'Frisk og fin',
      loff: 'Tørr'
    });
  });
});
