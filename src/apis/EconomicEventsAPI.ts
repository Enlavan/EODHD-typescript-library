import type {
  EconomicEvent,
  EconomicEventsParams,
  RequesterFn,
} from "../types.js";

/**
 * Global economic events calendar.
 *
 * Endpoint: `/economic-events`
 *
 * @see https://eodhd.com/financial-apis/economic-events-data-api
 */
export class EconomicEventsAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve upcoming and past economic events.
   *
   * @param params - Date range, country, comparison, limit/offset, format.
   */
  async getEconomicEvents(
    params?: EconomicEventsParams,
  ): Promise<EconomicEvent[] | string> {
    return this.request({
      path: "/economic-events",
      params,
    });
  }
}
