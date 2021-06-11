import HttpStatus from '../../api/HttpStatus';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import {
  ValidationResponse,
  map201,
  map400,
  map401,
  map422,
  map500,
  ValidationState
} from '@navikt/helse-arbeidsgiver-felles-frontend';

const mapResponse = (
  response: ValidationResponse,
  state: ValidationState,
  mapFeilmeldinger: (response: ValidationResponse, state: ValidationState) => FeiloppsummeringFeil[]
): ValidationState => {
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
      return nextState;
  }
};

export default mapResponse;
