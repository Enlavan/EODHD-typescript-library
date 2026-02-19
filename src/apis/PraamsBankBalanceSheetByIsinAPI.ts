import type { PraamsBankBalanceSheetRecord, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsBankBalanceSheetByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsBankBalanceSheetByIsin(isin: string): Promise<PraamsResponse<PraamsBankBalanceSheetRecord>> {
    return this.request({ path: "/mp/praams/bank/balance_sheet/isin/{isin}", pathParams: { isin } });
  }
}
