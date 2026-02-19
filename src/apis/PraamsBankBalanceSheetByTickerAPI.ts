import type { PraamsBankBalanceSheetRecord, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsBankBalanceSheetByTickerAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsBankBalanceSheetByTicker(ticker: string): Promise<PraamsResponse<PraamsBankBalanceSheetRecord>> {
    return this.request({ path: "/mp/praams/bank/balance_sheet/ticker/{ticker}", pathParams: { ticker } });
  }
}
