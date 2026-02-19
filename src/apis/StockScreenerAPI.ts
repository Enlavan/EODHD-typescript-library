import type { RequesterFn, StockScreenerParams, StockScreenerResponse } from "../types.js";

export class StockScreenerAPI {
  constructor(private readonly request: RequesterFn) {}

  async getStockScreener(params?: StockScreenerParams): Promise<StockScreenerResponse | string> {
    return this.request({ path: "/screener", params });
  }
}
