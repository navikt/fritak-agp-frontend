import GravidKravState from './GravidKravState';

interface oppsummeringVerdier {
  beloep: number;
  dager: number;
}

const showKontrollsporsmaalLonn = (state: GravidKravState): boolean => {
  const totalVerdier = state.perioder?.reduce((previous, current) => {
    previous.dager = (previous.dager || 0) + (current.dager || 0);
    previous.beloep = (previous.beloep || 0) + (current.beloep || 0);

    return previous;
  });
  return (state.gDagsbeloep ?? 0) < (totalVerdier?.beloep ?? 0) / (totalVerdier?.dager ?? 1);
};

export default showKontrollsporsmaalLonn;
