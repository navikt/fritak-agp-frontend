enum RestStatus {
  NotStarted = -1,
  Started = 1,
  Successfully = 200,
  Created = 201,
  Unknown = -2,
  Timeout = -3,
  Error = 500,
  Unauthorized = 401
}

export default RestStatus;
