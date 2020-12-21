import KroniskState from './KroniskState';

export enum KroniskActionType {
  Fnr,
  Orgnr,
  Reset,
  Validate
}

export const defaultKroniskState = () => {
  return {};
};

const KroniskReducer = (state, action): KroniskState => {
  console.log('Kronisk', action, state);
  switch (action.type) {
    case KroniskActionType.Fnr:
      return { fnr: action.payload };
    case KroniskActionType.Orgnr:
      return { orgnr: action.payload };
    case KroniskActionType.Reset:
      return defaultKroniskState();
    case KroniskActionType.Validate:
      return {};
    default:
      throw new Error();
  }
};

export default KroniskReducer;
