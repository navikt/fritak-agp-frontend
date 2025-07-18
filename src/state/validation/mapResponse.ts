import { ValidationResponse } from './ValidationResponse';
import HttpStatus from '../../api/HttpStatus';
import { ValidationState } from './ValidationState';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import map200 from './map200';
import map201 from './map201';
import map400 from './map400';
import map401 from './map401';
import map422 from './map422';
import map500 from './map500';
import map409 from './map409';

const mapResponse = <Type>(
  response: ValidationResponse<Type>,
  state: ValidationState,
  mapFeilmeldinger: (response: ValidationResponse<Type>, state: ValidationState) => FeiloppsummeringFeil[]
): ValidationState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case HttpStatus.Successfully:
      return map200(nextState);
    case HttpStatus.Created:
      return map201(nextState);
    case HttpStatus.BadRequest:
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
    case HttpStatus.PayloadTooLarge:
      return map400(nextState);
    case HttpStatus.Conflict:
      return map409(nextState);
    default:
      return nextState;
  }
};

export default mapResponse;
