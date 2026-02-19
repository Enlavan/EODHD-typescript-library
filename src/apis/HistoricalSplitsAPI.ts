import type { HistoricalSplitsParams, RequesterFn, SplitRecord } from "../types.js";

export class HistoricalSplitsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getHistoricalSplits(ticker: string, params?: HistoricalSplitsParams): Promise<SplitRecord[] | string> {
    return this.request({ path: "/splits/{ticker}", pathParams: { ticker }, params });
  }
}
