import type { LiveStockPricesParams, RealTimeQuote, RequesterFn } from "../types.js";

export class LiveStockPricesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getLiveStockPrices(ticker: string, params?: LiveStockPricesParams): Promise<RealTimeQuote | RealTimeQuote[] | string> {
    return this.request({ path: "/real-time/{ticker}", pathParams: { ticker }, params });
  }
}
