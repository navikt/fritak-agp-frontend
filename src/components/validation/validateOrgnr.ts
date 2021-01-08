import isValidOrgnr from '../gravid/isValidOrgnr';

export const validateOrgnr = (
  orgnr?: string,
  required: boolean = false
): string | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? 'Mangler organisasjonsnummer' : undefined;
  }
  if (!isValidOrgnr(orgnr)) {
    return required ? 'Ugyldig organisasjonsnummer' : undefined;
  }
  return;
};
