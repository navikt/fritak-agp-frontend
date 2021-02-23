export const validateDager = (dager: number | undefined, required: boolean): string | undefined => {
  if (!dager) {
    return required ? 'Mangler dager' : undefined;
  }
  return dager === undefined ? 'Må fylles ut' : undefined;
};

export default validateDager;
