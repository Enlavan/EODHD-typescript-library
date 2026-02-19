import type { CalendarIpo, RequesterFn, UpcomingIposParams, UpcomingIposResponse } from "../types.js";

export class UpcomingIPOsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getUpcomingIpos(params?: UpcomingIposParams): Promise<UpcomingIposResponse | CalendarIpo[] | string> {
    return this.request({ path: "/calendar/ipos", params });
  }
}
