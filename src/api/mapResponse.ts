// import ValidationResponse from './ValidationResponse';
// import HttpStatus from './HttpStatus';
// import map201 from '../validation/map201';
// import map400 from '../validation/map400';
// import map401 from '../validation/map401';
// import map422 from '../validation/map422';
// import map500 from '../validation/map500';
// import { ValidationState } from '../validation/ValidationState';
// import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

// const mapResponse = (
//   response: ValidationResponse,
//   state: ValidationState,
//   mapFeilmeldinger: (response: ValidationResponse, state: ValidationState) => FeiloppsummeringFeil[]
// ): ValidationState => {
//   const nextState = Object.assign({}, state);
//   switch (response.status) {
//     case HttpStatus.Created:
//       return map201(nextState);
//     case HttpStatus.BadRequest:
//       return map400(nextState);
//     case HttpStatus.Unauthorized:
//       return map401(nextState);
//     case HttpStatus.UnprocessableEntity:
//       nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
//       return map422(nextState);
//     case HttpStatus.Error:
//       return map500(nextState);
//     default:
//       return nextState;
//   }
// };

// export default mapResponse;

import ValidationResponse from './ValidationResponse';
import HttpStatus from './HttpStatus';
import map201 from '../validation/map201';
import map400 from '../validation/map400';
import map401 from '../validation/map401';
import map422 from '../validation/map422';
import map500 from '../validation/map500';
import { ValidationState } from '../validation/ValidationState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

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
