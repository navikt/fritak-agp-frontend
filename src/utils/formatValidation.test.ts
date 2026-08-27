import formatValidation from './formatValidation';
import ValidationResult from './ValidationResult';
import { i18n } from 'i18next';

const createTranslateMock = (returnValue: string = 'translated') => ({
  t: vi.fn().mockReturnValue(returnValue)
});

describe('formatValidation', () => {
  it('should return undefined when validationResult is undefined', () => {
    const translate = createTranslateMock();
    expect(formatValidation(undefined, translate as unknown as i18n)).toBeUndefined();
  });

  it('should call translate.t with the key when value is undefined', () => {
    const translate = createTranslateMock('feil melding');
    const validationResult: ValidationResult = { key: 'SOME_ERROR_KEY' };
    const result = formatValidation(validationResult, translate as unknown as i18n);
    expect(translate.t).toHaveBeenCalledWith('SOME_ERROR_KEY');
    expect(result).toBe('feil melding');
  });

  it('should call translate.t with key and value when value is provided', () => {
    const translate = createTranslateMock('dato feil');
    const validationResult: ValidationResult = { key: 'DATE_ERROR', value: { date: '01.01.2020' } };
    const result = formatValidation(validationResult, translate as unknown as i18n);
    expect(translate.t).toHaveBeenCalledWith('DATE_ERROR', { date: '01.01.2020' });
    expect(result).toBe('dato feil');
  });

  it('should return the translated string', () => {
    const translate = createTranslateMock('oversatt feilmelding');
    const validationResult: ValidationResult = { key: 'MISSING_FIELD' };
    const result = formatValidation(validationResult, translate as unknown as i18n);
    expect(result).toBe('oversatt feilmelding');
  });
});
