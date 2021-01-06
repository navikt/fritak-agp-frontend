import isValidOrgnr from '../gravid/isValidOrgnr';

export const validateFnr = (
  orgnr?: string,
  required: boolean = false
): string | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? 'Mangler fødselsnummer' : undefined;
  }
  if (!isValidOrgnr(orgnr)) {
    return required ? 'Ugyldig fødselsnummer' : undefined;
  }
  return;
};
