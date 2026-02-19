import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioLargestVolatilityAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioLargestVolatility(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/volume/{indexId}", pathParams: { indexId } });
  }
}
