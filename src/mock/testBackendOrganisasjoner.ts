import BackendOrganisasjon from '../api/arbeidsgiver/BackendOrganisasjon';

const testBackendOrganisasjoner: BackendOrganisasjon[] = [
  {
    navn: 'ANSTENDIG BJØRN KOMMUNE',
    underenheter: [],
    orgnr: '810007672'
  },
  {
    navn: 'ANSTENDIG PIGGSVIN BYDEL',
    orgnr: '810007702',
    underenheter: [
      {
        navn: 'ANSTENDIG PIGGSVIN BRANNVESEN',
        underenheter: [],
        orgnr: '810008032'
      },
      {
        navn: 'ANSTENDIG PIGGSVIN BARNEHAGE',
        underenheter: [],
        orgnr: '810007842'
      },
      {
        navn: 'ANSTENDIG PIGGSVIN SYKEHJEM',
        underenheter: [],
        orgnr: '810007982'
      }
    ]
  },
  {
    navn: 'SKOPPUM OG SANDØY',
    underenheter: [],
    orgnr: '911206722'
  },
  {
    navn: 'SKJERSTAD OG KJØRSVIKBUGEN',
    underenheter: [],
    orgnr: '911212218'
  }
];
export default testBackendOrganisasjoner;
