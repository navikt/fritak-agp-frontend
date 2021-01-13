import RestStatus from './RestStatus';
import ValidationResponse from './ValidationResponse';

export const VALID_RESPONSE_STATUSES = [
  RestStatus.Successfully,
  RestStatus.Created,
  RestStatus.Error,
  RestStatus.BadRequest,
  RestStatus.Unauthorized,
  RestStatus.UnprocessableEntity
];

export const findStatus = (status: number): RestStatus => {
  return VALID_RESPONSE_STATUSES.includes(status) ? status : RestStatus.Unknown;
};

export const mapValidationResponse = (
  status: number,
  json: any
): ValidationResponse => {
  return {
    status: findStatus(status),
    violations: json['violations'] || []
  };
};
