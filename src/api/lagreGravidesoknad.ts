import dayjs from 'dayjs';
import RestStatus from './RestStatus';
import handleStatus from './handleStatus';

export interface lagreGravideInterface {
  status: number;
  validering:
    | lagreGravideResponse
    | lagreGravideBackendError
    | lagreGravideBackendError[]; // TODO: Tilpass data fra backend
}

export interface lagreGravidesoknadParametere {
  dato?: Date;
  fnr?: string;
  tilrettelegge?: boolean;
  tiltak?: string;
  tiltakBeskrivelse?: string;
  omplassering?: string;
}

interface lagreGravidesoknadPostParametere {
  dato: string;
  fnr: string;
  tilrettelegge: boolean;
  tiltak: string;
  tiltakBeskrivelse: string;
  omplassering: string;
}

export interface lagreGravideResponse {
  violations: lagreGravideValidationError[];
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export interface lagreGravideValidationError {
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
  return {
    dato: dayjs(payload.dato).format('YYYY-MM-DD'),
    fnr: payload.fnr || '',
    tilrettelegge: payload.tilrettelegge || false,
    tiltak: payload.tiltak || '',
    tiltakBeskrivelse: payload.tiltakBeskrivelse || '',
    omplassering: payload.omplassering || ''
  };
};

const lagreGravidesoknad = (
  basePath: string,
  payload: lagreGravidesoknadParametere
): Promise<lagreGravideInterface> => {
  const bodyPayload = adaptPayload(payload);
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
      method: 'POST',
      body: JSON.stringify(bodyPayload)
    })
      .then(handleStatus)
      .then((json) => ({
        status: RestStatus.Successfully,
        validering: json
      }))
      .catch((status) => ({
        status: status,
        validering: []
      }))
  ]);
};

export default lagreGravidesoknad;
