import type { FundamentalsParams, FundamentalsResponse, RequesterFn } from "../types.js";

export class FundamentalsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getFundamentals(ticker: string, params?: FundamentalsParams): Promise<FundamentalsResponse | string> {
    return this.request({ path: "/fundamentals/{ticker}", pathParams: { ticker }, params });
  }
}
