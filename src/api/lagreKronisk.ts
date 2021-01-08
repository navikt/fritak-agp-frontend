import RestStatus from './RestStatus';
import postData from './postData';
import ValidationError from './ValidationError';

export interface lagreKroniskResponsdata {
  status: RestStatus;
  validering:
    | ValidationError
    | lagreKroniskBackendError
    | lagreKroniskBackendError[];
}

export interface lagreKroniskParametere {
  orgnr?: string;
  fnr?: string;
  tilrettelegge?: boolean;
  tiltak?: string[];
  tiltakBeskrivelse?: string;
  omplassering?: string;
  omplasseringAarsak?: string;
  bekreftet?: boolean;
  dokumentasjon?: string;
}

interface lagreKroniskPostParametere {
  orgnr: string;
  fnr: string;
  tilrettelegge: boolean;
  bekreftet: boolean;
  tiltak?: string[];
  tiltakBeskrivelse?: string;
  omplassering?: string;
  omplasseringAarsak?: string;
  dokumentasjon?: string;
}

export interface lagreKroniskBackendError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

const adaptPayload = (
  payload: lagreKroniskParametere
): lagreKroniskPostParametere => {
  const postParams: lagreKroniskPostParametere = {
    orgnr: payload.orgnr || '',
    fnr: payload.fnr || '',
    tilrettelegge: payload.tilrettelegge || false,
    bekreftet: payload.bekreftet || false
  };

  if (payload.tiltak) {
    postParams['tiltak'] = payload.tiltak as string[];
  }

  if (payload.tiltakBeskrivelse) {
    postParams['tiltakBeskrivelse'] = payload.tiltakBeskrivelse;
  }

  if (payload.omplassering) {
    postParams['omplassering'] = payload.omplassering;
  }

  if (payload.omplasseringAarsak) {
    postParams['omplasseringAarsak'] = payload.omplasseringAarsak;
  }

  if (payload.dokumentasjon) {
    postParams['dokumentasjon'] = payload.dokumentasjon;
  }

  return postParams;
};

const lagreKronisk = (
  basePath: string,
  payload: lagreKroniskParametere
): Promise<lagreKroniskResponsdata> => {
  const bodyPayload: lagreKroniskPostParametere = adaptPayload(payload);

  return postData(basePath + '/api/v1/gravid/soeknad', bodyPayload);
};

export default lagreKronisk;
