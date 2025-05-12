import ValidationResponse, { ValidationProblemDetail } from '../state/validation/ValidationResponse';

const mockValidationResponse = <Type>(status: number, felter: string[], message?: string) => {
  return {
    violations: mockViolations(felter, message),
    type: 'urn:nav:helsearbeidsgiver:validation-error',
    title: '',
    status: status,
    instance: '',
    response: {}
  } as ValidationResponse<Type>;
};

const mockViolations = (felter: string[], message?: string) =>
  felter.map((felt) => mockValidationProblemDetail(felt, message));

const mockValidationProblemDetail = (path: string, message?: string) => {
  return {
    validationType: '',
    message: message,
    propertyPath: path || '',
    invalidValue: ''
  } as ValidationProblemDetail;
};

export default mockValidationResponse;
