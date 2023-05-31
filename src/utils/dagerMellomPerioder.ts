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

    if (periode.fom?.year && acc.fom?.year && periode.tom?.year && acc.tom?.year) {
      if (dayjs(datoToString(periode.fom)) > dayjs(datoToString(acc.fom))) {
        periode.fom = acc.fom;
      }

      if (dayjs(datoToString(periode.tom)) < dayjs(datoToString(acc.tom))) {
        periode.tom = acc.tom;
      }
    }

    return periode;
  });
}

function avstandIDager(periodeMinMax: any): number[] {
  if (!periodeMinMax) {
    return [];
  }

  return periodeMinMax.map((periode, index) => {
    if (index === 0) {
      return 0;
    } else {
      if (periode.fom?.year && periodeMinMax[index - 1].tom?.year) {
        const dager = dayjs(datoToString(periode.fom)).diff(dayjs(datoToString(periodeMinMax[index - 1].tom)), 'd');

        if (dager < 0)
          return dayjs(datoToString(periodeMinMax[index - 1].fom)).diff(dayjs(datoToString(periode.tom)), 'd');
        else return dager;
      } else {
        return 0;
      }
    }
  });
}
