import type { BulkFundamentalsParams, FundamentalsResponse, RequesterFn } from "../types.js";

export class BulkFundamentalsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getBulkFundamentals(exchange: string, params?: BulkFundamentalsParams): Promise<FundamentalsResponse[] | string> {
    return this.request({ path: "/bulk-fundamentals/{exchange}", pathParams: { exchange }, params });
  }
}
