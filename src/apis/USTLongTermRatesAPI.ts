import type { RequesterFn, USTPaginatedResponse, USTLongTermRate, USTRatesParams } from "../types.js";

export class USTLongTermRatesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUSTLongTermRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTLongTermRate>> {
    return this.request({ path: "/ust/long-term-rates", params });
  }
}
