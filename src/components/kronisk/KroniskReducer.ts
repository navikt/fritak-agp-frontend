import KroniskState from './KroniskState';
import { KroniskActions } from './KroniskActions';

export const defaultKroniskState = () => {
  return {};
};

const KroniskReducer = (state, action): KroniskState => {
  switch (action.type) {
    case KroniskActions.Fnr:
      return { fnr: action.payload };
    case KroniskActions.Orgnr:
      return { orgnr: action.payload };
    case KroniskActions.Reset:
      return defaultKroniskState();
    case KroniskActions.Validate:
      return {};
    default:
      throw new Error();
  }
};

export default KroniskReducer;
