enum HttpStatus {
  NotStarted = -1,
  Started = 1,
  Successfully = 200,
  Created = 201,
  Unknown = -2,
  Timeout = -3,
  Error = 500,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  UnprocessableEntity = 422
}

export default HttpStatus;
