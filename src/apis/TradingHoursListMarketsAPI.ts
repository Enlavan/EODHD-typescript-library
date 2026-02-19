import type { RequesterFn, TradingHoursListParams, TradingHoursMarket } from "../types.js";

export class TradingHoursListMarketsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getTradingHoursListMarkets(params?: TradingHoursListParams): Promise<TradingHoursMarket[]> {
    return this.request({ path: "/mp/tradinghours/markets", params });
  }
}
