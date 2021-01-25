export const validateTil = (
  fra: string | undefined,
  til: string | undefined,
  required: boolean
): string | undefined => {
  if (til == undefined || til == '') {
    return required ? 'Mangler til dato' : undefined;
  }
  return til == undefined ? 'Må fylles ut' : '';
};
