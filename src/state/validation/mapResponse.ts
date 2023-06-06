import ValidationResponse from './ValidationResponse';
import HttpStatus from '../../api/HttpStatus';
import { ValidationState } from './ValidationState';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import map200 from './map200';
import map201 from './map201';
import map400 from './map400';
import map401 from './map401';
import map422 from './map422';
import map500 from './map500';
// import GravidKravState from '../../components/gravidkrav/GravidKravState';
// import KroniskKravState from '../../components/kroniskkrav/KroniskKravState';
// import GravidState from '../../components/gravid/GravidState';

const mapResponse = <Type>(
  response: ValidationResponse<Type>,
  state: any,
  mapFeilmeldinger: (response: ValidationResponse<Type>, state: any) => FeiloppsummeringFeil[]
): ValidationState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case HttpStatus.Successfully:
      return map200(nextState);
    case HttpStatus.Created:
      return map201(nextState);
    case HttpStatus.BadRequest:
    case HttpStatus.PayloadTooLarge:
      return map400(nextState);
    case HttpStatus.Unauthorized:
      return map401(nextState);
    case HttpStatus.NotFound:
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      return map400(nextState);
    case HttpStatus.UnprocessableEntity:
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      return map422(nextState);
    case HttpStatus.Error:
      return map500(nextState);
    default:
      return nextState;
  }
};

export default mapResponse;
