import dayjs from 'dayjs';
import { datoToString } from './dato/Dato';
import { Delperiode } from '../components/kroniskkrav/KroniskKravState';

export default function antallDagerMellomArbeidsgiverperioder(arbeidsgiverperioder: Array<Delperiode>): Array<number> {
  if (!arbeidsgiverperioder) return [];
  let forrigePeriode = arbeidsgiverperioder.shift();
  let dagerMellom;
  arbeidsgiverperioder.forEach((nestePeriode) => {
    if (!forrigePeriode?.tom) safePush(dagerMellom, 0);
    else {
      const forrigeTom = dayjs(datoToString(forrigePeriode.tom));
      const denneFom = dayjs(datoToString(nestePeriode.fom));

      safePush(dagerMellom, forrigeTom.diff(denneFom));
    }

    forrigePeriode = nestePeriode;
  });

  return dagerMellom;
}

function safePush(liste, element) {
  if (!liste) {
    liste = [element];
  } else {
    liste.push(element);
  }
}
