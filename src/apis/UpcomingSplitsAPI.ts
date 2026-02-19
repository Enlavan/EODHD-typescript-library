import type { CalendarSplitRecord, RequesterFn, UpcomingSplitsParams, UpcomingSplitsResponse } from "../types.js";

export class UpcomingSplitsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUpcomingSplits(params?: UpcomingSplitsParams): Promise<UpcomingSplitsResponse | CalendarSplitRecord[] | string> {
    return this.request({ path: "/calendar/splits", params });
  }
}
