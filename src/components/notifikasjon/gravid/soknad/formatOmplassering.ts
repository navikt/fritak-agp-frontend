import { Omplassering } from '../../../gravid/Omplassering';
import gravidSoknadOmplassering from './gravidSoknadOmplassering';

const formatOmplassering = (omplassering: string | undefined, omplasseringAarsak: string | undefined) => {
  let omplasseringAarsakText = '';

  if (omplasseringAarsak) {
    omplasseringAarsakText = gravidSoknadOmplassering[omplasseringAarsak];
  }

  if (!omplasseringAarsakText) {
    omplasseringAarsakText = (omplasseringAarsak || '').split('_').join(' ').toLowerCase(); // Helt avhenging av at backend serverer noe fornuftig
  }

  switch (omplassering) {
    case Omplassering.JA:
      return 'Omplassering til annen jobb er forsøkt';
    case Omplassering.NEI:
      return 'Omplassering til annen jobb er ikke forsøkt';
    case Omplassering.IKKE_MULIG:
      if (omplasseringAarsakText) {
        return 'Omplassering til annen jobb er ikke mulig fordi ' + omplasseringAarsakText;
      }
      return 'Omplassering til annen jobb er ikke mulig';
    default:
      return '[Mangler data]';
  }
};

export default formatOmplassering;
