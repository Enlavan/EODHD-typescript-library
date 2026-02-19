import type { IllioChapterInsight, RequesterFn } from "../types.js";

export class IllioBestWorstAPI {
  constructor(private readonly request: RequesterFn) {}

  async getIllioBestWorst(indexId: string): Promise<IllioChapterInsight> {
    return this.request({ path: "/mp/illio/chapters/best-and-worst/{indexId}", pathParams: { indexId } });
  }
}
