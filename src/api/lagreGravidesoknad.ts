import RestStatus from './RestStatus';
import postData from './postData';
import ValidationResponse from './ValidationResponse';

export interface lagreGravideResponsdata {
  status: RestStatus;
  validering:
    | ValidationResponse
    | lagreGravideBackendError
    | lagreGravideBackendError[];
}

export interface lagreGravidesoknadParametere {
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

interface lagreGravidesoknadPostParametere {
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

export interface lagreGravideBackendError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

const adaptPayload = (
  payload: lagreGravidesoknadParametere
): lagreGravidesoknadPostParametere => {
  const postParams: lagreGravidesoknadPostParametere = {
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

const lagreGravidesoknad = (
  basePath: string,
  payload: lagreGravidesoknadParametere
): Promise<lagreGravideResponsdata> => {
  const bodyPayload: lagreGravidesoknadPostParametere = adaptPayload(payload);

  return postData(basePath + '/api/v1/gravid/soeknad', bodyPayload);
};

export default lagreGravidesoknad;
