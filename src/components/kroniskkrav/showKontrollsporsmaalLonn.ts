import KroniskKravState from './KroniskKravState';

const showKontrollsporsmaalLonn = (state: KroniskKravState): boolean => {
  return (state.gDagsbeloep ?? 0) < (state.beloep ?? 0) / (state.dager ?? 1);
};

export default showKontrollsporsmaalLonn;
