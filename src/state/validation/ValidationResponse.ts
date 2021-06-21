import { Arbeidsgiverperiode } from '../../api/kroniskkrav/KroniskKravRequest';

export interface ValidationResponse {
  violations: ValidationProblemDetail[];
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  instance?: string;
}

export interface ValidationProblemDetail {
  index?: number;
  period?: Arbeidsgiverperiode;
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue?: any;
}

export default ValidationResponse;
