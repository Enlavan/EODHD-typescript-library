import type { CboeIndexDataParams, CboeIndex, RequesterFn } from "../types.js";

export class CboeIndexDataAPI {
  constructor(private readonly request: RequesterFn) {}

  async getCboeIndexData(params: CboeIndexDataParams): Promise<CboeIndex[] | string> {
    return this.request({ path: "/cboe/index", params });
  }
}
