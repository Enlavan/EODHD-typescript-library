import type { IndexComponent, IndexComponentsParams, RequesterFn } from "../types.js";

export class IndexComponentsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIndexComponents(symbol: string, params?: IndexComponentsParams): Promise<IndexComponent[] | Record<string, unknown> | string> {
    return this.request({ path: "/mp/unicornbay/spglobal/comp/{symbol}", pathParams: { symbol }, params });
  }
}
