import dayjs from 'dayjs';
import { Delperiode } from '../components/kroniskkrav/KroniskKravState';

export default function antallDagerMellomArbeidsgiverperioder(arbeidsgiverperioder: Array<Delperiode>): Array<number> {
  if (!arbeidsgiverperioder) return [];
  let forrigePeriode = arbeidsgiverperioder.shift();
  let dagerMellom;
  arbeidsgiverperioder.forEach((nestePeriode) => {
    if (!forrigePeriode?.tom) safePush(dagerMellom, 0);
    else {
      const forrigeTom = forrigePeriode.tom;
      const denneFom = nestePeriode.fom;

      safePush(dagerMellom, dayjs(forrigeTom).diff(denneFom));
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
