export const validateDager = (dager: number | undefined, required: boolean): string | undefined => {
  if (dager == undefined || dager == 0) {
    return required ? 'Mangler dager' : undefined;
  }
  return dager == undefined ? 'Må fylles ut' : '';
};
