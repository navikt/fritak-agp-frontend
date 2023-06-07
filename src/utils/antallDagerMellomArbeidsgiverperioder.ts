import dayjs from 'dayjs';
import { Delperiode } from '../components/kroniskkrav/KroniskKravState';

export default function antallDagerMellomArbeidsgiverperioder(
  arbeidsgiverperioder: Array<Delperiode> | undefined
): Array<number> {
  if (!arbeidsgiverperioder) return [];
  let forrigePeriode = arbeidsgiverperioder.shift();
  let dagerMellom;

  arbeidsgiverperioder.forEach((nestePeriode) => {
    if (!forrigePeriode?.tom) dagerMellom = safePush(dagerMellom, 0);
    else {
      const forrigeTom = forrigePeriode.tom;
      const denneFom = nestePeriode.fom;

      dagerMellom = safePush(dagerMellom, dayjs(denneFom).diff(forrigeTom, 'd'));
    }

    forrigePeriode = nestePeriode;
  });

  return dagerMellom;
}

function safePush(liste: Array<number> | undefined, element): Array<number> {
  if (!liste) {
    liste = [element];
  } else {
    liste.push(element);
  }
  return liste;
}
