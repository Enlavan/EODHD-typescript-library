import type { PraamsScreenerBody, PraamsScreenerParams, PraamsScreenerResponse, RequesterFn } from "../types.js";

export class PraamsSmartScreenerBondAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsSmartScreenerBond(body: PraamsScreenerBody, params?: PraamsScreenerParams): Promise<PraamsScreenerResponse> {
    return this.request({ path: "/mp/praams/explore/bond", method: "POST", body, params });
  }
}
