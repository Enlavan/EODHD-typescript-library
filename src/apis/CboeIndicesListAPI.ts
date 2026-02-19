import type { CboeIndex, CboeIndicesListParams, RequesterFn } from "../types.js";

export class CboeIndicesListAPI {
  constructor(private readonly request: RequesterFn) {}

  async getCboeIndicesList(params?: CboeIndicesListParams): Promise<CboeIndex[] | string> {
    return this.request({ path: "/cboe/indices", params });
  }
}
