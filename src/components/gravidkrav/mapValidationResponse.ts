import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import GravidKravState from './GravidKravState';
import map201 from '../../validation/map201';
import mapDefault from '../../validation/mapDefault';
import map422 from '../../validation/map422';
import map401 from '../../validation/map401';
import HttpStatus from '../../api/HttpStatus';
import map400 from '../../validation/map400';

export const mapFeilmeldinger = (response: ValidationResponse, state: GravidKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'identitetsnummer':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'virksomhetsnummer':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;

      case 'periode.fom':
        state.fraError = v.message;
        feilmeldinger.push(lagFeil('fra', v.message));
        break;

      case 'periode.tom':
        state.tilError = v.message;
        feilmeldinger.push(lagFeil('til', v.message));
        break;

      case 'periode.antallDagerMedRefusjon':
        state.dagerError = v.message;
        feilmeldinger.push(lagFeil('dager', v.message));
        break;

      case 'periode.beloep':
        state.beloepError = v.message;
        feilmeldinger.push(lagFeil('beloep', v.message));
        break;

      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;

      case 'periode':
        state.dagerError = v.message;
        feilmeldinger.push(
          lagFeil('dager', v.message.length ? v.message : 'Refusjonsdager kan ikke overstige periodelengden')
        );
    }
  });
  return feilmeldinger;
};

export const mapValidationResponse = (response: ValidationResponse, state: GravidKravState): GravidKravState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case HttpStatus.Created:
      map201(nextState);
      break;
    case HttpStatus.BadRequest:
      map400(nextState);
      break;
    case HttpStatus.Unauthorized:
      map401(nextState);
      break;
    case HttpStatus.UnprocessableEntity:
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      map422(nextState);
      break;
    default:
      mapDefault(nextState);
      break;
  }
  return nextState;
};
