import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationError from '../../api/ValidationError';
import isBackendValidationError from './isBackendValidationError';

describe('isBackendValidationError', () => {
  it('should ignore a validation error from the backend', () => {
    const mockError: lagreGravideBackendError = {
      type: 'Error',
      title: 'Backend error',
      status: 123,
      detail: 'Oppsie',
      instance: 'Instance'
    };
    expect(isBackendValidationError(mockError)).toBeFalsy();
  });

  it('should detect a validation error from the backend if the error list is empty', () => {
    const mockError: ValidationError = {
      violations: [
        {
          validationType: 'type',
          message: 'Message',
          propertyPath: 'Path',
          invalidValue: 'Value'
        }
      ],
      type: 'type',
      title: 'Message',
      status: 123,
      detail: 'detail',
      instance: '1'
    };
    expect(isBackendValidationError(mockError)).toBeTruthy();
  });

  it('should ignore a validation error from the backend if the error list is empty', () => {
    const mockError: ValidationError = {
      status: '123',
      validationErrors: [],
      genericMessage: 'Message',
      referenceNumber: '1'
    };
    expect(isBackendValidationError(mockError)).toBeFalsy();
  });
});
