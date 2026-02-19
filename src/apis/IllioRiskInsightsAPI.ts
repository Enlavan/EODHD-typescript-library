import type { IllioCategoryInsight, RequesterFn } from "../types.js";

export class IllioRiskInsightsAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioRiskInsights(indexId: string): Promise<IllioCategoryInsight> {
    return this.request({ path: "/mp/illio/categories/risk/{indexId}", pathParams: { indexId } });
  }
}
