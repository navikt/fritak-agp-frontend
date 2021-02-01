export const validateBeloep = (beloep: number | undefined, required: boolean): string | undefined => {
  if (beloep == undefined) {
    return required ? 'Mangler beløp' : undefined;
  }

  return beloep == undefined ? 'Må fylles ut' : '';
};
