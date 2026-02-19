import type { DividendRecord, HistoricalDividendsParams, RequesterFn } from "../types.js";

export class HistoricalDividendsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getHistoricalDividends(ticker: string, params?: HistoricalDividendsParams): Promise<DividendRecord[] | string> {
    return this.request({ path: "/div/{ticker}", pathParams: { ticker }, params });
  }
}
