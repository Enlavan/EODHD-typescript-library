import { EODHD_AUX_BASE_URL } from "../constants.js";
import type { RequesterFn } from "../types.js";

/**
 * Company logo images.
 *
 * Endpoint: `/logo/{symbol}` (aux URL)
 */
export class LogoAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Download the company logo as a PNG image.
   *
   * Uses the auxiliary base URL (`eodhistoricaldata.com`).
   * Returns raw binary data as an `ArrayBuffer`.
   *
   * @param symbol - Symbol code, e.g. `"AAPL.US"`.
   */
  async getLogo(symbol: string): Promise<ArrayBuffer> {
    return this.request({
      baseUrl: EODHD_AUX_BASE_URL,
      path: "/logo/{symbol}",
      pathParams: { symbol },
      responseType: "arrayBuffer",
    });
  }
}
