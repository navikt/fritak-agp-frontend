import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';

export interface ValidationState {
  validated?: boolean; // Validert gyldig
  error?: boolean; // Valideringsfeil
  submitting?: boolean; // Submit knapp ble trykket
  progress?: boolean; // Sendt til backend og venter på svar
  notAuthorized?: boolean; // Bruker må autentisere seg på nytt
  serverError?: boolean; // Server hadde internal feil
  kvittering?: boolean; // Mottatt godkjent svar fra backend
  feilmeldinger: Array<FeiloppsummeringFeil>;
}

export default ValidationState;
