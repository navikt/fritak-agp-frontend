import dayjs from 'dayjs';
import RestStatus from './RestStatus';
import handleStatus from './handleStatus';

export interface lagreGravideInterface {
  status: RestStatus;
  validering:
    | lagreGravideValidationError
    | lagreGravideBackendError
    | lagreGravideBackendError[]; // TODO: Tilpass data fra backend
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
}

export interface lagreGravideValidationError {
  violations: lagreGravideValidationErrorItem[];
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export interface lagreGravideValidationErrorItem {
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue: string;
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

  return postParams;
};

const lagreGravidesoknad = (
  basePath: string,
  payload: lagreGravidesoknadParametere
): Promise<lagreGravideInterface> => {
  const bodyPayload: lagreGravidesoknadPostParametere = adaptPayload(payload);
  let okStatus = 0;
  return Promise.race([
    new Promise<lagreGravideInterface>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject({ status: RestStatus.Timeout });
      }, 10000);
    }).catch(() => ({
      status: RestStatus.Timeout,
      validering: []
    })),
    fetch(basePath + '/api/v1/gravid/soeknad', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(bodyPayload)
    })
      .then((params) => {
        okStatus = params.status;
        return handleStatus(params);
      })
      .then((json) => {
        debugger;
        return {
          status: okStatus === 0 ? RestStatus.Successfully : okStatus,
          validering: json
        };
      })
      .catch((status) => ({
        status: status,
        validering: []
      }))
  ]);
};

export default lagreGravidesoknad;
