import type { InvestverteCompany, RequesterFn } from "../types.js";

export class InvestverteListCompaniesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteListCompanies(): Promise<InvestverteCompany[]> {
    return this.request({ path: "/mp/investverte/companies" });
  }
}
