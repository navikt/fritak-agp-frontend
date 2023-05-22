import validator from '@navikt/fnrvalidator';

const isValidFnr = (fnr: string): boolean => {
  return validator.fnr(fnr).status === 'valid';
};

export default isValidFnr;
