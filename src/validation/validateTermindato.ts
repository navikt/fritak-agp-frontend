import { DateValidationT } from '@navikt/ds-react';

export const validateTermindato = (
  termindato: Date | undefined,
  required: boolean,
  feilmelding: string,
  validation?: DateValidationT
): string | undefined => {
  if (validation?.isInvalid) {
    return required ? 'Dato er ikke gyldig' : undefined;
  }

  if (!termindato) {
    return required ? feilmelding : undefined;
  }
};

export default validateTermindato;
