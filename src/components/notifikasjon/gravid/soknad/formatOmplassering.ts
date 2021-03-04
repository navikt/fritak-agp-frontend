import { Omplassering } from '../../../gravid/Omplassering';

const formatOmplassering = (omplassering: string, omplasseringAarsak: string) => {
  switch (omplassering) {
    case Omplassering.JA:
      return 'Omplassering til annen jobb er forsøkt';
    case Omplassering.NEI:
      return 'Omplassering til annen jobb er ikke forsøkt';
    case Omplassering.IKKE_MULIG:
      return 'Omplassering til annen jobb er ikke mulig fordi ' + omplasseringAarsak;
    default:
      return '[Mangler data]';
  }
};

export default formatOmplassering;
