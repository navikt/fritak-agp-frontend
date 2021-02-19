import ValidationResponse, { ValidationProblemDetail } from '../api/ValidationResponse';

const mockValidationResponse = (status: number, felter: string[]) => {
  return {
    violations: mockViolations(felter),
    type: 'urn:nav:helsearbeidsgiver:validation-error',
    title: '',
    status: status,
    instance: ''
  } as ValidationResponse;
};

export const mockViolations = (felter: string[]) => felter.map((felt) => mockValidationProblemDetail(felt));

export const mockValidationProblemDetail = (path: string) => {
  return {
    validationType: '',
    message: 'feil',
    propertyPath: path || '',
    invalidValue: ''
  } as ValidationProblemDetail;
};

export default mockValidationResponse;
