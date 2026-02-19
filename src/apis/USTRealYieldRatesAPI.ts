import type { RequesterFn, USTPaginatedResponse, USTRatesParams, USTRealYieldRate } from "../types.js";

export class USTRealYieldRatesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUSTRealYieldRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTRealYieldRate>> {
    return this.request({ path: "/ust/real-yield-rates", params });
  }
}
