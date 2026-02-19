import type { RequesterFn, TradingHoursMarketDetail, TradingHoursMarketDetailsParams } from "../types.js";

export class TradingHoursMarketDetailsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getTradingHoursMarketDetails(params: TradingHoursMarketDetailsParams): Promise<TradingHoursMarketDetail[]> {
    return this.request({ path: "/mp/tradinghours/markets/details", params });
  }
}
