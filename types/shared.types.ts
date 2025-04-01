export interface FetchResponse<T> {
  total: number;
  data: T[];
  success: boolean;
}