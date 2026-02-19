import type { EarningsTrend, EarningsTrendsParams, RequesterFn } from "../types.js";

export class EarningsTrendsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getEarningsTrends(params: EarningsTrendsParams): Promise<EarningsTrend[] | Record<string, EarningsTrend> | string> {
    return this.request({ path: "/calendar/trends", params });
  }
}
