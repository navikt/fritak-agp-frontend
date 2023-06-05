export const validateTermindato = (
  termindato: Date | undefined,
  required: boolean,
  feilmelding: string
): string | undefined => {
  if (!termindato) {
    return required ? feilmelding : undefined;
  }
};

export default validateTermindato;
