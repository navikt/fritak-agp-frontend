import { differenceInCalendarDays, isValid } from 'date-fns';
import { MAX_DAGER_MELLOM_PERIODER } from '../config/konstanter';
import type { KravPeriodeData } from '../state/KravPeriodeData';

export enum ValidatePerioderKeys {
  VALIDATE_PERIODER_OPPHOLD = 'VALIDATE_PERIODER_OPPHOLD',
  VALIDATE_PERIODER_OVERLAPP = 'VALIDATE_PERIODER_OVERLAPP'
}

interface PeriodeFeil {
  index: number;
  key: ValidatePerioderKeys;
  value?: number;
}

export const validatePerioder = (perioder: KravPeriodeData[] | undefined): PeriodeFeil[] => {
  if (!perioder || perioder.length < 2) {
    return [];
  }

  const sortertePerioder: { index: number; fom: Date; tom: Date }[] = [];
  for (const [index, periode] of perioder.entries()) {
    const { fom, tom } = periode;
    if (
      !fom ||
      !tom ||
      !isValid(fom) ||
      !isValid(tom) ||
      periode.fomInputError ||
      periode.tomInputError ||
      periode.fomError ||
      periode.tomError ||
      differenceInCalendarDays(tom, fom) < 0
    ) {
      return [];
    }
    sortertePerioder.push({ index, fom, tom });
  }
  sortertePerioder.sort((first, second) => differenceInCalendarDays(first.fom, second.fom));

  const feil: PeriodeFeil[] = [];
  let forrigePeriode = sortertePerioder[0];
  for (const periode of sortertePerioder.slice(1)) {
    const datodifferanse = differenceInCalendarDays(periode.fom, forrigePeriode.tom);
    if (datodifferanse <= 0) {
      feil.push({ index: periode.index, key: ValidatePerioderKeys.VALIDATE_PERIODER_OVERLAPP });
    } else if (datodifferanse - 1 > MAX_DAGER_MELLOM_PERIODER) {
      feil.push({
        index: periode.index,
        key: ValidatePerioderKeys.VALIDATE_PERIODER_OPPHOLD,
        value: MAX_DAGER_MELLOM_PERIODER
      });
    }
    if (differenceInCalendarDays(periode.tom, forrigePeriode.tom) > 0) {
      forrigePeriode = periode;
    }
  }
  return feil;
};
