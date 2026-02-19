import type { PraamsScreenerBody, PraamsScreenerParams, PraamsScreenerResponse, RequesterFn } from "../types.js";

export class PraamsSmartScreenerEquityAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsSmartScreenerEquity(body: PraamsScreenerBody, params?: PraamsScreenerParams): Promise<PraamsScreenerResponse> {
    return this.request({ path: "/mp/praams/explore/equity", method: "POST", body, params });
  }
}
