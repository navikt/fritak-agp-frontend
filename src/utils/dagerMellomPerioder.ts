import dayjs from 'dayjs';
import { GravidKravPeriode } from '../components/gravidkrav/GravidKravState';
import { Delperiode, KroniskKravPeriode } from '../components/kroniskkrav/KroniskKravState';
import { datoToString } from './dato/Dato';

export default function dagerMellomPerioder(
  perioder: Array<GravidKravPeriode | KroniskKravPeriode> | undefined
): Array<number> {
  let periodeMinMax;
  if (perioder) {
    perioder.forEach((arbeidsgiverperiode) => {
      const aper = arbeidsgiverperiode.perioder.reduce((acc, current) => {
        const periode: Delperiode = structuredClone(current);
        if (current.fom && acc.fom) {
          if (dayjs(datoToString(current.fom)) > dayjs(datoToString(acc.fom))) {
            periode.fom = acc.fom;
          }

          if (dayjs(datoToString(current.tom)) < dayjs(datoToString(acc.tom))) {
            periode.tom = acc.tom;
          }
        }

        return periode;
      });

      if (!periodeMinMax) periodeMinMax = [aper];
      else periodeMinMax.push(aper);
    });
  }

  const avstanderMellomPerioder: Array<number> = periodeMinMax.map((periode, index) => {
    if (index === 0) {
      return 0;
    } else {
      if (periode.fom && periodeMinMax[index - 1].tom) {
        return dayjs(datoToString(periode.fom)).diff(dayjs(datoToString(periodeMinMax[index - 1].tom)), 'd');
      } else {
        return 0;
      }
    }
  });

  avstanderMellomPerioder.shift();

  return avstanderMellomPerioder;
}
