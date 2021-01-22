import KroniskState from './KroniskState';
import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import map201 from '../../validation/map201';
import map401 from '../../validation/map401';
import map422 from '../../validation/map422';
import mapDefault from '../../validation/mapDefault';

export const mapFeilmeldinger = (response: ValidationResponse, state: KroniskState) => {
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
      case 'kommentar':
        state.kommentarError = v.message;
        feilmeldinger.push(lagFeil('kommentar', v.message));
        break;
      case 'arbeidstyper':
        state.arbeidError = v.message;
        feilmeldinger.push(lagFeil('arbeidsutfører', v.message));
        break;
      case 'paakjenningstyper':
        state.paakjenningerError = v.message;
        feilmeldinger.push(lagFeil('paakjenninger', v.message));
        break;
      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;
      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;
      case 'fravaer':
        state.fravaerError = v.message;
        feilmeldinger.push(lagFeil('fravaer', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export const mapValidationResponse = (response: ValidationResponse, state: KroniskState): KroniskState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case 201:
      return map201(nextState);
    case 401:
      return map401(nextState);
    case 422:
      return map422(nextState);
    default:
      return mapDefault(nextState);
  }
};
