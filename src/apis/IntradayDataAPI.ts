import type { IntradayBar, IntradayParams, RequesterFn } from "../types.js";

/**
 * Intraday historical data (1m, 5m, 1h intervals).
 *
 * Endpoint: `/intraday/{ticker}`
 *
 * @see https://eodhd.com/financial-apis/intraday-historical-data-api
 */
export class IntradayDataAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve intraday OHLCV bars.
   *
   * @param ticker - Symbol in `CODE.EXCHANGE` format.
   * @param params - Interval, date range, format.
   */
  async getIntraday(
    ticker: string,
    params?: IntradayParams,
  ): Promise<IntradayBar[] | string> {
    return this.request({
      path: "/intraday/{ticker}",
      pathParams: { ticker },
      params,
    });
  }
}
