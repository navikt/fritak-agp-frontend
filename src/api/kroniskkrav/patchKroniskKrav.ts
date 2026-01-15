import { ValidationResponse } from '../../state/validation/ValidationResponse';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

interface KroniskKravPatchPayload {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Array<{
    fom: string;
    tom: string;
    antallDagerMedRefusjon: number;
    månedsinntekt: number;
    gradering?: number;
  }>;
  bekreftet: boolean;
  antallDager?: number;
  aarsakEndring: string;
}

const patchKroniskKrav = (
  basePath: string,
  kravId: string,
  payload: KroniskKravPatchPayload
): Promise<ValidationResponse<KroniskKravResponse>> => {
  return httpRequest(
    basePath + Paths.KroniskKravSlett + kravId,
    payload as unknown as Record<string, unknown>,
    'PATCH'
  );
};

export default patchKroniskKrav;
