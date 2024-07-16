import { idnr } from '@navikt/fnrvalidator';

export default function isValidFnr(fnr: string) {
  const status = idnr(fnr);
  return status.status === 'valid';
}
