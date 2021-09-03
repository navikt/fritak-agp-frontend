import { Omplassering } from '../../../gravid/Omplassering';
import gravidSoknadOmplassering from './gravidSoknadOmplassering';

const formatOmplassering = (omplassering: string, omplasseringAarsak: string) => {
  let omplasseringAarsakText = '';

  if (!!omplasseringAarsak) {
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
      return 'Omplassering til annen jobb er ikke mulig fordi ' + omplasseringAarsakText;
    default:
      return '[Mangler data]';
  }
};

export default formatOmplassering;
