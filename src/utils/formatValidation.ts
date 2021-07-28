import ValidationResult from './ValidationResult';
import { i18n } from 'i18next';

const formatValidation = (validationResult: ValidationResult | undefined, translate: i18n): string | undefined => {
  if (!validationResult) {
    return;
  }
  if (validationResult.value === undefined) {
    return translate.t(validationResult.key);
  }
  return translate.t(validationResult.key, validationResult.value);
};

export default formatValidation;
