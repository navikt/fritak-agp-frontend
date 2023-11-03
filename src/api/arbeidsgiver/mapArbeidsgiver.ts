import BackendOrganisasjon from './BackendOrganisasjon';
import { Organisasjon } from '@navikt/bedriftsmeny';

export const mapArbeidsgiver = (backendData: BackendOrganisasjon[]): Organisasjon[] =>
  backendData.map(
    (backendOrganisasjon) =>
      ({
        Name: backendOrganisasjon.name,
        Type: backendOrganisasjon.type,
        OrganizationNumber: backendOrganisasjon.organizationNumber,
        OrganizationForm: backendOrganisasjon.organizationForm,
        Status: backendOrganisasjon.status,
        ParentOrganizationNumber: backendOrganisasjon.parentOrganizationNumber || ''
      } as Organisasjon)
  );

export default mapArbeidsgiver;
