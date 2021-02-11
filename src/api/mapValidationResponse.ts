import HttpStatus from './HttpStatus';
import ValidationResponse from './ValidationResponse';

export const VALID_RESPONSE_STATUSES = [
  HttpStatus.Successfully,
  HttpStatus.Created,
  HttpStatus.Error,
  HttpStatus.BadRequest,
  HttpStatus.Unauthorized,
  HttpStatus.UnprocessableEntity
];

export const findStatus = (status: number): HttpStatus => {
  return VALID_RESPONSE_STATUSES.includes(status) ? status : HttpStatus.Unknown;
};

export const mapValidationResponse = (status: number, json: any): ValidationResponse => {
  return {
    status: findStatus(status),
    violations: json['violations'] || []
  };
};
