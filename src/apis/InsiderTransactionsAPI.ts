import { EODHD_AUX_BASE_URL } from "../constants.js";
import type {
  InsiderTransaction,
  InsiderTransactionsParams,
  RequesterFn,
} from "../types.js";

/**
 * Insider trading transactions.
 *
 * Endpoint: `/insider-transactions` (aux URL)
 *
 * @see https://eodhd.com/financial-apis/insider-transactions-api
 */
export class InsiderTransactionsAPI {
  constructor(private readonly request: RequesterFn) {}

  /**
   * Retrieve insider (officer/director) transactions.
   *
   * Uses the auxiliary base URL (`eodhistoricaldata.com`).
   *
   * @param params - Symbol code, date range, limit, format.
   */
  async getInsiderTransactions(
    params?: InsiderTransactionsParams,
  ): Promise<InsiderTransaction[] | string> {
    return this.request({
      baseUrl: EODHD_AUX_BASE_URL,
      path: "/insider-transactions",
      params,
    });
  }
}
