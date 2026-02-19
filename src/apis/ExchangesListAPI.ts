import type { ExchangeInfo, ExchangesListParams, RequesterFn } from "../types.js";

export class ExchangesListAPI {
  constructor(private readonly request: RequesterFn) {}

  async getExchangesList(params?: ExchangesListParams): Promise<ExchangeInfo[] | string> {
    return this.request({ path: "/exchanges-list", params });
  }
}
