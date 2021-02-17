import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import GravidState from './GravidState';
import map201 from '../../validation/map201';
import map422 from '../../validation/map422';
import map401 from '../../validation/map401';
import mapDefault from '../../validation/mapDefault';
import map500 from '../../validation/map500';
import HttpStatus from '../../api/HttpStatus';
import map400 from '../../validation/map400';

export const mapFeilmeldinger = (response: ValidationResponse, state: GravidState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'fnr':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;
      case 'orgnr':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;

      case 'tilrettelegge':
        feilmeldinger.push(lagFeil('tilrettelegge', v.message));
        break;
      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'tiltak':
        state.tiltakError = v.message;
        feilmeldinger.push(lagFeil('tiltak', v.message));
        break;

      case 'tiltakBeskrivelse':
        state.tiltakBeskrivelseError = v.message;
        feilmeldinger.push(lagFeil('tiltakBeskrivelse', v.message));
        break;

      case 'omplassering':
        state.omplasseringError = v.message;
        feilmeldinger.push(lagFeil('omplassering', v.message));
        break;

      case 'omplasseringAarsak':
        state.omplasseringAarsakError = v.message;
        feilmeldinger.push(lagFeil('omplasseringAarsak', v.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export const mapValidationResponse = (response: ValidationResponse, state: GravidState): GravidState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case HttpStatus.Created:
      return map201(nextState);
    case HttpStatus.BadRequest:
      return map400(nextState);
    case HttpStatus.Unauthorized:
      return map401(nextState);
    case HttpStatus.UnprocessableEntity:
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      return map422(nextState);
    case HttpStatus.Error:
      return map500(nextState);
    default:
      return mapDefault(nextState);
  }
};
