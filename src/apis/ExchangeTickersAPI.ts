import type { ExchangeSymbol, ExchangeTickersParams, RequesterFn } from "../types.js";

export class ExchangeTickersAPI {
  constructor(private readonly request: RequesterFn) {}

  async getExchangeTickers(exchangeCode: string, params?: ExchangeTickersParams): Promise<ExchangeSymbol[] | string> {
    return this.request({ path: "/exchange-symbol-list/{exchangeCode}", pathParams: { exchangeCode }, params });
  }
}
