import validateDokumentasjon from './validateDokumentasjon';

describe('validateDokumentasjon', () => {
  it('should verify that we dont fail if no param is given', () => {
    expect(validateDokumentasjon(undefined)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateDokumentasjon('123')).toEqual({ key: 'VALIDATE_DOKUMENTASJON_MINIMUM_SIZE' });
  });

  it('should verify that there is a dager missing when required', () => {
    const fileAsString = new Array(10485762).fill('1').join('');

    expect(validateDokumentasjon(fileAsString)).toEqual({ key: 'VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE' });
  });
});
