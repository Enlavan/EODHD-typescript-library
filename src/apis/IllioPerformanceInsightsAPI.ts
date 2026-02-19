import type { IllioCategoryInsight, RequesterFn } from "../types.js";

export class IllioPerformanceInsightsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioPerformanceInsights(indexId: string): Promise<IllioCategoryInsight> {
    return this.request({ path: "/mp/illio/categories/performance/{indexId}", pathParams: { indexId } });
  }
}
