export interface ValidationError {
  violations: ValidationErrorItem[];
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export interface ValidationErrorItem {
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue: string;
}

export default ValidationError;
