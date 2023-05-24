import { Aarsfravaer } from './Aarsfravaer';
import { MONTHS } from '../../utils/months';
import { validerFravaerMaaned } from './validerFravaerMaaned';
import { monthKey } from '../../utils/monthKey';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';

export const validerFravaerTabell = (
  liste: Array<Aarsfravaer>,
  ikkeHistoriskFravaer: boolean
): FeiloppsummeringFeil[] => {
  let feilmeldinger: Array<FeiloppsummeringFeil> | undefined = undefined;
  let isEmpty = true;

  liste.forEach((l) => {
    MONTHS.forEach((m, index) => {
      const month = monthKey(m);
      const dager = l[month];
      if (dager != undefined) {
        isEmpty = false;
      }
      let feilmelding = validerFravaerMaaned(l.year, index, dager);
      if (feilmelding) {
        if (feilmeldinger) feilmeldinger.push(feilmelding);
        else feilmeldinger = [feilmelding];
      }
    });
  });

  if (ikkeHistoriskFravaer === true) {
    if (isEmpty) return [];
    feilmeldinger = tryggPush(feilmeldinger, {
      skjemaelementId: '#fravaer',
      feilmelding: 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.'
    });

    return feilmeldinger;
  }

  if (isEmpty) {
    feilmeldinger = tryggPush(feilmeldinger, {
      skjemaelementId: '#fravaer',
      feilmelding: 'Fravær må fylles ut.'
    });
  }
  return feilmeldinger ? feilmeldinger : [];
};

function tryggPush(
  feilmeldinger: Array<FeiloppsummeringFeil> | undefined,
  feilmelding: FeiloppsummeringFeil
): Array<FeiloppsummeringFeil> {
  if (feilmeldinger) feilmeldinger.push(feilmelding);
  else feilmeldinger = [feilmelding];

  return feilmeldinger;
}
