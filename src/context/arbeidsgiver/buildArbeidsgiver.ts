import { Organisasjon } from '@navikt/bedriftsmeny';

const buildArbeidsgiver = (
  Name: string,
  OrganizationForm: string,
  OrganizationNumber: string,
  ParentOrganizationNumber: string
): Organisasjon => {
  return {
    Name,
    OrganizationForm,
    OrganizationNumber,
    ParentOrganizationNumber
  };
};

export default buildArbeidsgiver;
