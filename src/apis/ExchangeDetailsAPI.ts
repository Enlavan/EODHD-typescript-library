import type { ExchangeDetails, ExchangeDetailsParams, RequesterFn } from "../types.js";

export class ExchangeDetailsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getExchangeDetails(exchangeCode: string, params?: ExchangeDetailsParams): Promise<ExchangeDetails | string> {
    return this.request({ path: "/exchange-details/{exchangeCode}", pathParams: { exchangeCode }, params });
  }
}
