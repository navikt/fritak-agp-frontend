export const validateBeloep = (beloep: string | undefined, required: boolean): string | undefined => {
  if (beloep == undefined || beloep == '') {
    return required ? 'Mangler beløp' : undefined;
  }

  return beloep == undefined ? 'Må fylles ut' : '';
};
