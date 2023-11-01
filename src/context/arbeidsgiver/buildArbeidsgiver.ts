import { Organisasjon } from '@navikt/bedriftsmeny';

const buildArbeidsgiver = (
  Name: string,
  OrganizationForm: string,
  OrganizationNumber: string,
  ParentOrganizationNumber: string,
  Status: string,
  Type: string
): Organisasjon => {
  return {
    Name,
    OrganizationForm,
    OrganizationNumber,
    ParentOrganizationNumber,
    Status,
    Type
  };
};

export default buildArbeidsgiver;
