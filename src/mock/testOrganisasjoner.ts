import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

const testOrganisasjoner: Organisasjon[] = [
  {
    Name: 'ANSTENDIG BJØRN KOMMUNE',
    OrganizationForm: 'KOMM',
    OrganizationNumber: '810007672',
    ParentOrganizationNumber: '',
    Status: 'Active',
    Type: 'Enterprise'
  },
  {
    Name: 'ANSTENDIG PIGGSVIN BRANNVESEN',
    OrganizationForm: 'BEDR',
    OrganizationNumber: '810008032',
    ParentOrganizationNumber: '810007702',
    Status: 'Active',
    Type: 'Business'
  },
  {
    Name: 'ANSTENDIG PIGGSVIN BARNEHAGE',
    OrganizationForm: 'BEDR',
    OrganizationNumber: '810007842',
    ParentOrganizationNumber: '810007702',
    Status: 'Active',
    Type: 'Business'
  },
  {
    Name: 'ANSTENDIG PIGGSVIN BYDEL',
    OrganizationForm: 'ORGL',
    OrganizationNumber: '810007702',
    ParentOrganizationNumber: '',
    Status: 'Active',
    Type: 'Enterprise'
  },
  {
    Name: 'ANSTENDIG PIGGSVIN SYKEHJEM',
    OrganizationForm: 'BEDR',
    OrganizationNumber: '810007982',
    ParentOrganizationNumber: '810007702',
    Status: 'Active',
    Type: 'Business'
  },
  {
    Name: 'SKOPPUM OG SANDØY',
    OrganizationForm: 'BEDR',
    OrganizationNumber: '911206722',
    ParentOrganizationNumber: '',
    Status: 'Active',
    Type: 'Business'
  },
  {
    Name: 'SKJERSTAD OG KJØRSVIKBUGEN',
    OrganizationForm: 'AS',
    OrganizationNumber: '911212218',
    ParentOrganizationNumber: '',
    Status: 'Active',
    Type: 'Enterprise'
  }
];

export default testOrganisasjoner;
