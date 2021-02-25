import KroniskKravState from './KroniskKravState';

const showKontrollsporsmaalLonn = (state: KroniskKravState): boolean => {
  const sumDager = state.perioder?.reduce((total, aktuellPeriode) => {
    return total + (aktuellPeriode.dager ?? 0);
  }, 0);

  const sumBeloep = state.perioder?.reduce((total, aktuellPeriode) => {
    return total + (aktuellPeriode.beloep ?? 0);
  }, 0);

  return (state.gDagsbeloep ?? 0) < (sumBeloep ?? 0) / (sumDager ?? 1);
};

export default showKontrollsporsmaalLonn;
