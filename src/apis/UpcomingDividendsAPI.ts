import type { RequesterFn, UpcomingDividendsParams, UpcomingDividendsResponse } from "../types.js";

export class UpcomingDividendsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUpcomingDividends(params?: UpcomingDividendsParams): Promise<UpcomingDividendsResponse | string> {
    return this.request({ path: "/calendar/dividends", params });
  }
}
