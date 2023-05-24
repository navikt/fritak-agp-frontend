import ValidationResult from './ValidationResult';
import { i18n } from 'i18next';
import textify from './textify';

const formatValidation = (validationResult: ValidationResult | undefined, translate: i18n): string | undefined => {
  if (!validationResult) {
    return;
  }
  if (validationResult.value === undefined) {
    return textify(translate.t(validationResult.key));
  }
  return textify(translate.t(validationResult.key, validationResult.value));
};

export default formatValidation;
