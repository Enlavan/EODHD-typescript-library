import type { InvestverteEsgScore, InvestverteEsgViewParams, RequesterFn } from "../types.js";

export class InvestverteViewCompanyAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteViewCompany(symbol: string, params?: InvestverteEsgViewParams): Promise<InvestverteEsgScore[]> {
    return this.request({ path: "/mp/investverte/esg/{symbol}", pathParams: { symbol }, params });
  }
}
