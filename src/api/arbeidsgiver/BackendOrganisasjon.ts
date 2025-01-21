type BackendOrganisasjon = {
  navn: string;
  orgnr: string;
  underenheter: Array<BackendOrganisasjon>;
};

export default BackendOrganisasjon;
