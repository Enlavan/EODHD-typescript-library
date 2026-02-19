import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioVolatilityBandsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioVolatilityBands(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/volatility/{indexId}", pathParams: { indexId } });
  }
}
