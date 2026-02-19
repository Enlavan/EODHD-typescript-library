import type {
  HistoricalMarketCapParams,
  HistoricalMarketCapRecord,
  RequesterFn,
} from "../types.js";

/**
 * Historical market capitalization data.
 *
 * Endpoint: `/historical-market-cap/{ticker}`
 *
 * @see https://eodhd.com/financial-apis/historical-market-capitalization-api
 */
export class HistoricalMarketCapAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve historical market cap values.
   *
   * @param ticker - Symbol in `CODE.EXCHANGE` format.
   * @param params - Date range, format.
   */
  async getHistoricalMarketCap(
    ticker: string,
    params?: HistoricalMarketCapParams,
  ): Promise<HistoricalMarketCapRecord[] | string> {
    return this.request({
      path: "/historical-market-cap/{ticker}",
      pathParams: { ticker },
      params,
    });
  }
}
