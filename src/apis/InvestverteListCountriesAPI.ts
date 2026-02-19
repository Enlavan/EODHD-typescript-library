import type { InvestverteCountry, RequesterFn } from "../types.js";

export class InvestverteListCountriesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getInvestverteListCountries(): Promise<InvestverteCountry[]> {
    return this.request({ path: "/mp/investverte/countries" });
  }
}
