import type { BulkEodParams, BulkEodRecord, RequesterFn } from "../types.js";

/**
 * Bulk end-of-day data for an entire exchange (last trading day).
 *
 * Endpoint: `/eod-bulk-last-day/{exchange}`
 *
 * @see https://eodhd.com/financial-apis/bulk-api-eod-splits-dividends
 */
export class BulkEodAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve EOD data for all symbols on an exchange for the last trading day.
   *
   * @param exchange - Exchange code, e.g. `"US"`.
   * @param params - Date, symbols filter, type filter, format.
   */
  async getBulkEodLastDay(
    exchange: string,
    params?: BulkEodParams,
  ): Promise<BulkEodRecord[] | string> {
    return this.request({
      path: "/eod-bulk-last-day/{exchange}",
      pathParams: { exchange },
      params,
    });
  }
}
