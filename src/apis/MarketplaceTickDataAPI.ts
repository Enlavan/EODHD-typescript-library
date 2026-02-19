import type { MarketplaceTickDataParams, MarketplaceTickDataResponse, RequesterFn } from "../types.js";

export class MarketplaceTickDataAPI {
  constructor(private readonly request: RequesterFn) {}

  async getMarketplaceTickData(params: MarketplaceTickDataParams): Promise<MarketplaceTickDataResponse> {
    return this.request({ path: "/mp/unicornbay/tickdata/ticks", params });
  }
}
