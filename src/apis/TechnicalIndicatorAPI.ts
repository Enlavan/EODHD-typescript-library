import type { RequesterFn, TechnicalParams, TechnicalRecord } from "../types.js";

/**
 * Technical analysis indicators (SMA, EMA, RSI, MACD, Bollinger Bands, etc.).
 *
 * Endpoint: `/technical/{ticker}`
 *
 * @see https://eodhd.com/financial-apis/technical-indicators-api
 */
export class TechnicalIndicatorAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Calculate a technical indicator for a ticker.
   *
   * @param ticker - Symbol in `CODE.EXCHANGE` format.
   * @param params - Must include `function` (e.g. `"sma"`, `"rsi"`).
   */
  async getTechnical(
    ticker: string,
    params: TechnicalParams,
  ): Promise<TechnicalRecord[] | string> {
    return this.request({
      path: "/technical/{ticker}",
      pathParams: { ticker },
      params,
    });
  }
}
