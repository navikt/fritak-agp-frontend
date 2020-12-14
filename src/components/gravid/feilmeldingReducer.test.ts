import feilmeldingReducer from './feilmeldingReducer';

describe('feilmeldingReducer', () => {
  it('should set the correct error description', () => {
    const newState = feilmeldingReducer(
      {},
      { type: 'ost', feilmelding: 'Muggen' }
    );

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should update the correct error description', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'ost',
      feilmelding: 'Muggen'
    });

    expect(newState).toEqual({ ost: 'Muggen' });
  });

  it('should clear error descriptions', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'clear',
      feilmelding: 'Muggen'
    });

    expect(newState).toEqual({});
  });

  it('should add an error description', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'loff',
      feilmelding: 'Tørr'
    });

    expect(newState).toEqual({
      loff: 'Tørr',
      ost: 'Frisk og fin'
    });
  });

  it('should add an error description with field ansatteFeilmeldingId on action fnr', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'fnr',
      feilmelding: 'Feil med fnr'
    });

    expect(newState).toEqual({
      ansatteFeilmeldingId: 'Feil med fnr',
      ost: 'Frisk og fin'
    });
  });

  it('should add an error description with field arbeidsgiverFeilmeldingId on action orgnr', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'orgnr',
      feilmelding: 'Feil med orgnr'
    });

    expect(newState).toEqual({
      arbeidsgiverFeilmeldingId: 'Feil med orgnr',
      ost: 'Frisk og fin'
    });
  });

  it('should add an error description with field arbeidsgiverFeilmeldingId on action tiltak', () => {
    const initialState = { ost: 'Frisk og fin' };
    const newState = feilmeldingReducer(initialState, {
      type: 'tiltak',
      feilmelding: 'Feil med tiltak'
    });

    expect(newState).toEqual({
      tiltakFeilmeldingId: 'Feil med tiltak',
      ost: 'Frisk og fin'
    });
  });

  it('should delete an error description when empty string', () => {
    const initialState = { ost: 'Frisk og fin', loff: 'Tørr' };
    const newState = feilmeldingReducer(initialState, {
      type: 'ost',
      feilmelding: ''
    });

    expect(newState).toEqual({
      loff: 'Tørr'
    });
  });
});
