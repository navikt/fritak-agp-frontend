export interface ValidationResponse<T> {
  violations: ValidationProblemDetail[];
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  instance?: string;
  response?: T;
}

export interface ValidationProblemDetail {
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue?: string | number;
}
