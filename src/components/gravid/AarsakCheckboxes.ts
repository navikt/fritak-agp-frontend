import { Aarsak } from './Aarsak';

const AarsakCheckboxes = [
  {
    label: 'Den ansatte motsetter seg omplassering',
    value: Aarsak.MOTSETTER
  },
  {
    label: 'Vi får ikke kontakt med den ansatte',
    value: Aarsak.FAAR_IKKE_KONTAKT
  },
  {
    label: 'Vi har ikke andre oppgaver eller arbeidssteder å tilby',
    value: Aarsak.IKKE_ANDRE_OPPGAVER
  },
  {
    label:
      'Den ansatte vil ikke fungere i en annen jobb på grunn av helsetilstanden',
    value: Aarsak.HELSETILSTANDEN
  }
];

export default AarsakCheckboxes;
