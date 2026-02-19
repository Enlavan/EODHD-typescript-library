import type { RequesterFn, TradingHoursMarketStatus, TradingHoursMarketStatusParams } from "../types.js";

export class TradingHoursMarketStatusAPI {
  constructor(private readonly request: RequesterFn) {}

  async getTradingHoursMarketStatus(params: TradingHoursMarketStatusParams): Promise<Record<string, TradingHoursMarketStatus>> {
    return this.request({ path: "/mp/tradinghours/markets/status", params });
  }
}
