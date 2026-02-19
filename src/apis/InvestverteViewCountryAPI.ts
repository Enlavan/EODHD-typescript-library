import type { InvestverteCountryView, InvestverteEsgViewParams, RequesterFn } from "../types.js";

export class InvestverteViewCountryAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteViewCountry(symbol: string, params?: InvestverteEsgViewParams): Promise<InvestverteCountryView[]> {
    return this.request({ path: "/mp/investverte/country/{symbol}", pathParams: { symbol }, params });
  }
}
