import type { PraamsBankIncomeStatementRecord, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsBankIncomeStatementByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsBankIncomeStatementByIsin(isin: string): Promise<PraamsResponse<PraamsBankIncomeStatementRecord>> {
    return this.request({ path: "/mp/praams/bank/income_statement/isin/{isin}", pathParams: { isin } });
  }
}
