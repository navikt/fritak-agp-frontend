import BackendOrganisasjon from '../api/arbeidsgiver/BackendOrganisasjon';

const testBackendOrganisasjoner: BackendOrganisasjon[] = [
  {
    name: 'ANSTENDIG BJØRN KOMMUNE',
    type: 'Enterprise',
    parentOrganizationNumber: '',
    organizationForm: 'KOMM',
    organizationNumber: '810007672',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BRANNVESEN',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810008032',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BARNEHAGE',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007842',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BYDEL',
    type: 'Enterprise',
    parentOrganizationNumber: '',
    organizationForm: 'ORGL',
    organizationNumber: '810007702',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN SYKEHJEM',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007982',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'SKOPPUM OG SANDØY',
    type: 'Business',
    parentOrganizationNumber: '',
    organizationForm: 'BEDR',
    organizationNumber: '911206722',
    socialSecurityNumber: undefined,
    status: 'Active'
  },
  {
    name: 'SKJERSTAD OG KJØRSVIKBUGEN',
    type: 'Enterprise',
    parentOrganizationNumber: '',
    organizationForm: 'AS',
    organizationNumber: '911212218',
    socialSecurityNumber: undefined,
    status: 'Active'
  }
];

export default testBackendOrganisasjoner;
