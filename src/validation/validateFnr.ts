import { isValidFnr } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const validateFnr = (orgnr?: string, required: boolean = false): string | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? 'Mangler fødselsnummer' : undefined;
  }
  if (!isValidFnr(orgnr)) {
    return required ? 'Ugyldig fødselsnummer' : undefined;
  }
};
