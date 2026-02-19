import type { PraamsBankIncomeStatementRecord, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsBankIncomeStatementByTickerAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsBankIncomeStatementByTicker(ticker: string): Promise<PraamsResponse<PraamsBankIncomeStatementRecord>> {
    return this.request({ path: "/mp/praams/bank/income_statement/ticker/{ticker}", pathParams: { ticker } });
  }
}
