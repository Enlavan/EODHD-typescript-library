import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioPerformanceVsMarketAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioPerformanceVsMarket(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/performance/{indexId}", pathParams: { indexId } });
  }
}
