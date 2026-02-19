import type { CalendarEarning, RequesterFn, UpcomingEarningsParams, UpcomingEarningsResponse } from "../types.js";

export class UpcomingEarningsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUpcomingEarnings(params?: UpcomingEarningsParams): Promise<UpcomingEarningsResponse | CalendarEarning[] | string> {
    return this.request({ path: "/calendar/earnings", params });
  }
}
