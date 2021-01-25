import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import GravidKravState from './GravidKravState';
import map201 from '../../validation/map201';
import mapDefault from '../../validation/mapDefault';
import map422 from '../../validation/map422';
import map401 from '../../validation/map401';

export const mapFeilmeldinger = (response: ValidationResponse, state: GravidKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'fnr':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'fra':
        state.fraError = v.message;
        feilmeldinger.push(lagFeil('fra', v.message));
        break;

      case 'til':
        state.tilError = v.message;
        feilmeldinger.push(lagFeil('til', v.message));
        break;

      case 'dager':
        state.dagerError = v.message;
        feilmeldinger.push(lagFeil('dager', v.message));
        break;

      case 'beloep':
        state.beloepError = v.message;
        feilmeldinger.push(lagFeil('beloep', v.message));
        break;

      case 'bekreft':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export const mapValidationResponse = (response: ValidationResponse, state: GravidKravState): GravidKravState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case 201:
      return map201(nextState);
    case 401:
      return map401(nextState);
    case 422:
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      return map422(nextState);
    default:
      return mapDefault(nextState);
  }
};
