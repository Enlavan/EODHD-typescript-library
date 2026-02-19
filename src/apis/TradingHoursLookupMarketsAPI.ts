import type { RequesterFn, TradingHoursLookupParams, TradingHoursMarket } from "../types.js";

export class TradingHoursLookupMarketsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getTradingHoursLookupMarkets(params?: TradingHoursLookupParams): Promise<TradingHoursMarket[]> {
    return this.request({ path: "/mp/tradinghours/markets/lookup", params });
  }
}
