import { lagreGravideBackendError } from '../../api/lagreGravidesoknad';
import ValidationResponse from '../../api/ValidationResponse';
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
    const mockError: ValidationResponse = {
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
    const mockError: ValidationResponse = {
      violations: [],
      type: 'type',
      title: 'Message',
      status: 123,
      detail: 'Detail',
      instance: '1'
    };
    expect(isBackendValidationError(mockError)).toBeFalsy();
  });
});
