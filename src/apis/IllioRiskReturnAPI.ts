import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioRiskReturnAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioRiskReturn(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/risk/{indexId}", pathParams: { indexId } });
  }
}
