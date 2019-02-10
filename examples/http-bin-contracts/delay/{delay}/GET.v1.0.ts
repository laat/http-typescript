import { DelayResponse } from "./api.models";

/**
 * Returns a delayed response (max of 10 seconds).
 *
 * @version 1.0
 * @example
 * GET /delay/{delay}
 * Accept: application/json
 */
export interface Response extends DelayResponse {}
