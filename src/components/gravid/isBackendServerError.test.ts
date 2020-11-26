import {
  lagreGravideBackendError,
  lagreGravideValidationError
} from '../../api/lagreGravidesoknad';
import isBackendServerError from './isBackendServerError';

describe('isBackendServerError', () => {
  it('should detect a server error from the backend', () => {
    const mockError: lagreGravideBackendError = {
      type: 'Error',
      title: 'Backend error',
      status: 123,
      detail: 'Oppsie',
      instance: 'Instans'
    };
    expect(isBackendServerError(mockError)).toBeTruthy();
  });

  it('should ignore a validation error from the backend', () => {
    const mockError: lagreGravideValidationError = {
      type: 'type',
      title: 'title',
      status: 123,
      detail: 'Message',
      instance: '1',
      violations: []
    };
    expect(isBackendServerError(mockError)).toBeFalsy();
  });
});
