import {
  lagreGravideBackendError,
  lagreGravideResponse
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
    const mockError: lagreGravideResponse = {
      status: '123',
      validationErrors: [],
      genericMessage: 'Message',
      referenceNumber: '1'
    };
    expect(isBackendServerError(mockError)).toBeFalsy();
  });
});
