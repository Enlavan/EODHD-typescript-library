import type { PraamsEquityAnalysis, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsRiskScoringByIsinAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsRiskScoringByIsin(isin: string): Promise<PraamsResponse<PraamsEquityAnalysis>> {
    return this.request({ path: "/mp/praams/analyse/equity/isin/{isin}", pathParams: { isin } });
  }
}
