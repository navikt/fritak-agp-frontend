import isValidOrgnr from './isValidOrgnr';

export const validateOrgnr = (orgnr?: string, required: boolean = false): string | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? 'Mangler virksomhetsnummer' : undefined;
  }
  if (!isValidOrgnr(orgnr)) {
    return required ? 'Ugyldig virksomhetsnummer' : undefined;
  }
};
