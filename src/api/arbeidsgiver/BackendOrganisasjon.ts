export interface BackendOrganisasjon {
  name: string;
  type: string;
  parentOrganizationNumber?: string;
  organizationForm: string;
  organizationNumber: string;
  socialSecurityNumber?: string;
  status: string;
}
