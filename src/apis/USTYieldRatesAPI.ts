import type { RequesterFn, USTPaginatedResponse, USTRatesParams, USTYieldRate } from "../types.js";

export class USTYieldRatesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUSTYieldRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTYieldRate>> {
    return this.request({ path: "/ust/yield-rates", params });
  }
}
