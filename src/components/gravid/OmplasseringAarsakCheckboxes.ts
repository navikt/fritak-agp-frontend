import { OmplasseringAarsak } from './OmplasseringAarsak';

const OmplasseringAarsakCheckboxes = [
  {
    label: 'Den ansatte motsetter seg omplassering',
    value: OmplasseringAarsak.MOTSETTER
  },
  {
    label: 'Vi får ikke kontakt med den ansatte',
    value: OmplasseringAarsak.FAAR_IKKE_KONTAKT
  },
  {
    label: 'Vi har ikke andre oppgaver eller arbeidssteder å tilby',
    value: OmplasseringAarsak.IKKE_ANDRE_OPPGAVER
  },
  {
    label:
      'Den ansatte vil ikke fungere i en annen jobb på grunn av helsetilstanden',
    value: OmplasseringAarsak.HELSETILSTANDEN
  }
];

export default OmplasseringAarsakCheckboxes;
