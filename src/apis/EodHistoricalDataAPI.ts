import type { EodBar, EodParams, RequesterFn } from "../types.js";

/**
 * End-of-Day historical stock market data.
 *
 * Endpoint: `/eod/{ticker}`
 *
 * @see https://eodhd.com/financial-apis/api-for-historical-data-and-volumes
 */
export class EodHistoricalDataAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve end-of-day OHLCV bars for a given ticker.
   *
   * @param ticker - Symbol in `CODE.EXCHANGE` format, e.g. `"AAPL.US"`.
   * @param params - Optional query parameters (date range, period, format).
   * @returns Array of {@link EodBar} objects (JSON) or a raw string (CSV).
   */
  async getEod(
    ticker: string,
    params?: EodParams,
  ): Promise<EodBar[] | string> {
    return this.request({
      path: "/eod/{ticker}",
      pathParams: { ticker },
      params,
    });
  }
}
