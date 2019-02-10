/**
 * Returns a delayed response (max of 10 seconds).
 *
 * @version 1.0
 * @example
 * GET /delay/{delay}
 * Accept: application/json
 */
export interface Response {
  args: {};
  data: "";
  files: {};
  form: {};
  headers: { [key: string]: string };
  origin: string;
  url: string;
}
