import { erGyldigNorskOrgnummer } from '@navikt/sif-common-core/lib/validation/erGyldigNorskOrgnummer';

const isValidOrgnr = (orgnr: string): boolean => {
  return erGyldigNorskOrgnummer(orgnr);
};

export default isValidOrgnr;
