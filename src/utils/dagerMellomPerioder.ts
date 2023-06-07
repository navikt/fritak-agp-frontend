import dayjs from 'dayjs';
import { GravidKravPeriode } from '../components/gravidkrav/GravidKravState';
import { Delperiode, KroniskKravPeriode } from '../components/kroniskkrav/KroniskKravState';

export default function dagerMellomPerioder(
  perioder: Array<GravidKravPeriode | KroniskKravPeriode> | undefined
): Array<number> {
  let periodeMinMax;

  if (perioder) {
    perioder.forEach((arbeidsgiverperiode) => {
      const aper = finnPerioder(arbeidsgiverperiode);
      if (!periodeMinMax) periodeMinMax = [aper];
      else periodeMinMax.push(aper);
    });
  }

  const avstanderMellomPerioder: Array<number> = avstandIDager(periodeMinMax);
  avstanderMellomPerioder.shift();

  return avstanderMellomPerioder;
}

function finnPerioder(arbeidsgiverperiode: GravidKravPeriode | KroniskKravPeriode) {
  return arbeidsgiverperiode.perioder.reduce((acc, current) => {
    const periode: Delperiode = structuredClone(current);
    if (periode.fom && acc.fom && periode.tom && acc.tom) {
      if (periode.fom > acc.fom) {
        periode.fom = acc.fom;
      }

      if (periode.tom < acc.tom) {
        periode.tom = acc.tom;
      }
    }

    return periode;
  });
}

function avstandIDager(periodeMinMax: Array<Delperiode>): number[] {
  if (!periodeMinMax) {
    return [];
  }

  return periodeMinMax.map((periode, index) => {
    if (index === 0) {
      return 0;
    } else {
      if (periode.fom && periodeMinMax[index - 1].tom) {
        const dager = dayjs(periode.fom).diff(periodeMinMax[index - 1].tom, 'd');

        if (dager < 0) return dayjs(periodeMinMax[index - 1].fom).diff(periode.tom, 'd');
        else return dager;
      } else {
        return 0;
      }
    }
  });
}
