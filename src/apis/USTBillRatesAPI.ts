import type { RequesterFn, USTPaginatedResponse, USTBillRate, USTRatesParams } from "../types.js";

export class USTBillRatesAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUSTBillRates(params?: USTRatesParams): Promise<USTPaginatedResponse<USTBillRate>> {
    return this.request({ path: "/ust/bill-rates", params });
  }
}
