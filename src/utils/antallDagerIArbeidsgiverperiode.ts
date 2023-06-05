import { Delperiode } from '../components/kroniskkrav/KroniskKravState';
import dayjs from 'dayjs';

export default function antallDagerIArbeidsgiverperiode(perioder: Array<Delperiode> | undefined): number {
  if (typeof perioder === 'undefined') {
    return 0;
  }

  let dagerTotalt = 0;

  const brukbarePerioder = perioder
    .filter((periode) => !!periode.fom && !!periode.tom)
    .map((periode) => ({
      fom: periode.fom,
      tom: periode.tom
    }));

  brukbarePerioder.forEach((periode) => {
    dagerTotalt = dayjs(periode.tom).diff(periode.fom!, 'd') + dagerTotalt + 1;
  });
  return dagerTotalt;
}
