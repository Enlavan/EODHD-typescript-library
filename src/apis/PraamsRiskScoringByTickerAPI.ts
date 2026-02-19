import type { PraamsEquityAnalysis, PraamsResponse, RequesterFn } from "../types.js";

export class PraamsRiskScoringByTickerAPI {
  constructor(private readonly request: RequesterFn) {}

  async getPraamsRiskScoringByTicker(ticker: string): Promise<PraamsResponse<PraamsEquityAnalysis>> {
    return this.request({ path: "/mp/praams/analyse/equity/ticker/{ticker}", pathParams: { ticker } });
  }
}
