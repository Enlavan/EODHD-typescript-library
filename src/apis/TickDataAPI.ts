import type { RequesterFn, TickParams, TickTrade } from "../types.js";

/**
 * Tick-level (trade-by-trade) market data.
 *
 * Endpoint: `/ticks/{ticker}`
 *
 * @see https://eodhd.com/financial-apis/stock-market-tick-data-api
 */
export class TickDataAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve individual tick trades.
   *
   * @param ticker - Symbol in `CODE.EXCHANGE` format.
   * @param params - Date range, limit, format.
   */
  async getTicks(
    ticker: string,
    params?: TickParams,
  ): Promise<TickTrade[] | string> {
    return this.request({
      path: "/ticks/{ticker}",
      pathParams: { ticker },
      params,
    });
  }
}
