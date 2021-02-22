import GravidKravState from './GravidKravState';

const showKontrollsporsmaalLonn = (state: GravidKravState): boolean => {
  return (state.gDagsbeloep ?? 0) < (state.beloep ?? 0) / (state.dager ?? 1);
};

export default showKontrollsporsmaalLonn;
