import ValidationResult from '@navikt/helse-arbeidsgiver-felles-frontend/dist/validation/ValidationResult';

export interface ValidateDagerResult extends ValidationResult {
  key: 'VALIDATE_DAGER_MISSING' | 'VALIDATE_DAGER_REQUIRED';
}
export const validateDager = (dager: number | undefined, required: boolean): ValidateDagerResult | undefined => {
  if (!dager) {
    return required ? { key: 'VALIDATE_DAGER_MISSING' } : undefined;
  }
  return dager === undefined ? { key: 'VALIDATE_DAGER_REQUIRED' } : undefined;
};

export default validateDager;
