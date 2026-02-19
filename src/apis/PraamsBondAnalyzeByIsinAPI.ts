import type { PraamsBondAnalysis, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsBondAnalyzeByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsBondAnalyzeByIsin(isin: string): Promise<PraamsResponse<PraamsBondAnalysis>> {
    return this.request({ path: "/mp/praams/analyse/bond/{isin}", pathParams: { isin } });
  }
}
