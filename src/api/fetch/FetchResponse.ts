export interface FetchResponse<T = unknown> {
  status: number;
  json: T;
}
