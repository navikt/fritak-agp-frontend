import { Organisasjon } from '@navikt/virksomhetsvelger';

const testOrganisasjoner = [
  {
    navn: 'abc',
    orgnr: '123456789',
    underenheter: [
      {
        navn: 'ANSTENDIG PIGGSVIN BRANNVESEN',
        underenheter: [],
        orgnr: '810008032'
      }
    ]
  } as Organisasjon
];

export default testOrganisasjoner;
