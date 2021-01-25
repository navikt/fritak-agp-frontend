export const validateFra = (fra: string | undefined, required: boolean): string | undefined => {
  if (fra == undefined || fra == '') {
    return required ? 'Mangler fra dato' : undefined;
  }
  return fra == undefined ? 'Må fylles ut' : '';
};
